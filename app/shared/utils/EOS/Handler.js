import { Api, JsonRpc, Serialize } from 'eosjs2';
import ecc from 'eosjs-ecc';
import sha256 from 'fast-sha256';
import { cloneDeep, isObject } from 'lodash';

import { createHttpHandler } from '../http/handler';
import serialize from '../../actions/helpers/ledger/serialize';

const eosjs1 = require('eosjs');
const { transactionHeader } = require('eosio-signing-request/node_modules/eosjs/dist/eosjs-serialize');
const { stringToPublicKey, publicKeyToString } = require('eosio-signing-request/node_modules/eosjs/dist/eosjs-numeric');
const { JsSignatureProvider } = require('eosio-signing-request/node_modules/eosjs/dist/eosjs-jssig');
const { remote } = require('electron');

const LedgerApi = require('../../actions/helpers/hardware/ledger').default;

// Local store for ABIs
const Store = require('electron-store');

const store = new Store({
  name: 'abis'
});

// Number of minutes to cache the ABI
const abiCacheMinutes = 15;

// Fuel action template
const fuelTransaction = {
  account: 'greymassnoop',
  name: 'noop',
  authorization: [{
    actor: 'greymassfuel',
    permission: 'cosign',
  }],
  data: {
    // referrer: 'anchorwallet'
  }
};

const fuelEndpoints = {
  'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906': 'http://eos.greymass.com',
  'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473': 'http://jungle.greymass.com',
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': 'http://telos.greymass.com',
};

function convertLegacyPublicKey(s) {
  let pubkey = s;
  // Convert all legacy prefixes to EOS for this process
  if (s.length === 53) {
    pubkey = pubkey.replace(/^.{3}/g, 'EOS');
  }
  // Convert Legacy Keys
  if (pubkey.substr(0, 3) === 'EOS') {
    return publicKeyToString(stringToPublicKey(pubkey));
  }
  return pubkey;
}

function convertLegacyPublicKeys(keys) {
  return keys.map(convertLegacyPublicKey);
}

export default class EOSHandler {
  constructor(config) {
    this.config = config;
    if (config.signMethod === 'ledger') {
      this.signatureProvider = new LedgerSignatureProvider(config);
    } else {
      this.signatureProvider = new JsSignatureProvider(config.keyProvider || []);
    }
    this.initEOSJS(config.httpEndpoint)
    this.options = {
      blocksBehind: 3,
      broadcast: config.broadcast,
      expireSeconds: config.expireSeconds,
      sign: config.sign,
    };
    return this;
  }
  convert(pubkey) {
    return convertLegacyPublicKey(pubkey);
  }
  initEOSJS(endpoint) {
    this.rpc = new JsonRpc(endpoint, {
      fetch: async (path, request) => {
        const { httpClient, httpQueue } = await createHttpHandler(this.config);
        return httpQueue.add(async () => {
          // Retrieve using axios
          const response = await httpClient({
            method: request.method.toLowerCase(),
            url: path,
            data: request.body,
            headers: {
              'content-type': 'application/json',
            },
            timeout: 10000,
          }).catch((e) => e);
          if (response.isAxiosError) {
            return {
              ok: false,
              json: () => response.response.data
            };
          }
          // Return a response immitating what eosjs expects
          return {
            ok: true,
            json: () => response.data
          };
        });
      }
    });
    this.api = new Api({
      authorityProvider: this.getAuthorityProvider(),
      rpc: this.rpc,
      signatureProvider: this.signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    Object.keys(store.store).forEach((account) => {
      const escapedAccount = account.replace('.', '\\.');
      const expires = Date.now() - (1000 * 60 * abiCacheMinutes);
      const abi = store.get(escapedAccount);
      // If local cache is not stale, cache it within eosjs
      if (abi.ts > expires) {
        this.api.cachedAbis.set(abi.account_name, abi);
      }
    });
  }
  getAuthorityProvider() {
    const { rpc } = this;
    return {
      async getRequiredKeys(args) {
        const { transaction } = args;
        const modified = cloneDeep(transaction);
        modified.actions.forEach((action, ti) => {
          action.authorization.forEach((auth, ai) => {
            if (auth.actor === 'greymassfuel' && auth.permission === 'cosign') {
              modified.actions[ti].authorization.splice(ai, 1);
            }
          });
        });
        return convertLegacyPublicKeys((await rpc.fetch('/v1/chain/get_required_keys', {
          transaction: modified,
          available_keys: convertLegacyPublicKeys(args.availableKeys),
        })).required_keys);
      }
    };
  }
  sign(options) {
    return this.signatureProvider.sign(options);
  }
  push(signedTransaction) {
    let { serializedTransaction, signatures } = signedTransaction;
    if (!serializedTransaction && signedTransaction.transaction) {
      serializedTransaction = this.api.serializeTransaction(signedTransaction.transaction.transaction);
    }
    if (!signatures && signedTransaction.transaction && signedTransaction.transaction.signatures) {
      ({ signatures } = signedTransaction.transaction);
    }
    return this.api.pushSignedTransaction({ signatures, serializedTransaction });
  }
  async transact(tx, options = false) {
    const transaction = cloneDeep(tx);
    const combinedOptions = Object.assign({}, this.options, options);
    const { chainId } = this.config;
    if (
      // is Fuel enabled?
      this.config.greymassFuel
      // are using an endpoint where fuel is supported?
      && fuelEndpoints[chainId]
      // is this a broadcast transaction?
      && combinedOptions.broadcast
      // Ensure if it's an ESR request to only allow specific types
      && (
        !combinedOptions.esrReqType
        || ['action', 'action[]'].includes(combinedOptions.esrReqType)
      )
    ) {
      // If a Fuel endpoint exists, reinit and force its usage
      if (fuelEndpoints[chainId]) {
        this.initEOSJS(fuelEndpoints[chainId]);
        // Check to see if this is already being cosigned by Fuel
        const [firstAction] = transaction.actions;
        if (
          !['greymassfuel', 'greymassnoop'].includes(firstAction.account)
          && !['cosign', 'noop'].includes(firstAction.name)
        ) {
          // prepend Fuel action data
          transaction.actions.unshift(cloneDeep(fuelTransaction));
        }
      }
    }
    // no broadcast + sign = create a v16 format transaction
    //   should likely be converted to use esr payloads
    if (!combinedOptions.broadcast && !combinedOptions.sign) {
      return this.createTransaction(transaction, combinedOptions);
    }
    // issue the transaction with options and config
    const processed = await this.customTransact(transaction, combinedOptions);
    // no broadcast = create and return the transaction itself
    if (!combinedOptions.broadcast) {
      const deserializedTransaction = this.api.deserializeTransaction(processed.serializedTransaction);
      return this.createTransaction(deserializedTransaction, combinedOptions, processed.signatures);
    }
    // otherwise return processed tx like the normal transact does
    return processed;
  }
  // return a transaction like v16 would
  createTransaction = async (tx, combinedOptions = [], signatures = []) => {
    let transaction = tx;
    if (!tx.ref_block_num || !tx.ref_block_prefix) {
      const info = await this.rpc.get_info();
      const height = info.last_irreversible_block_num - combinedOptions.blocksBehind;
      const blockInfo = await this.rpc.get_block(height);
      transaction = Object.assign({}, cloneDeep(tx), {
        actions: await this.ensureSerializedActions(tx.actions),
        context_free_actions: [],
        transaction_extensions: [],
        expiration: this.getExpiration(combinedOptions),
        ref_block_num: blockInfo.block_num & 0xffff,
        ref_block_prefix: blockInfo.ref_block_prefix,
        max_cpu_usage_ms: 0,
        max_net_usage_words: 0,
        delay_sec: 0,
      });
    }
    const serializedTransaction = this.api.serializeTransaction(transaction);
    return {
      broadcast: false,
      transaction_id: Serialize.arrayToHex(sha256(serializedTransaction)).toLowerCase(),
      transaction: {
        compression: 'none',
        signatures,
        transaction
      }
    };
  }
  customTransact = async (transaction, { broadcast = true, sign = true, blocksBehind, expireSeconds }) => {
    let tx = transaction;
    if (
      !this.hasRequiredTaposFields(transaction)
      && typeof blocksBehind === 'number'
      && expireSeconds
    ) {
      tx = {
        ...(await this.getTransactionHeader(expireSeconds)),
        ...transaction
      };
    }
    if (!this.hasRequiredTaposFields(tx)) {
      throw new Error('Required configuration or TAPOS fields are not present');
    }
    const abis = await this.api.getTransactionAbis(tx);
    tx = { ...tx, actions: await this.api.serializeActions(tx.actions) };
    const serializedTransaction = this.api.serializeTransaction(tx);
    let pushTransactionArgs = { serializedTransaction, signatures: [] };
    if (sign) {
      const availableKeys = await this.signatureProvider.getAvailableKeys();
      pushTransactionArgs = await this.signatureProvider.sign({
        chainId: this.config.chainId,
        requiredKeys: availableKeys,
        serializedTransaction,
        abis,
      });
    }
    if (broadcast) {
      return this.api.pushSignedTransaction(pushTransactionArgs);
    }
    return pushTransactionArgs;
  }
  hasRequiredTaposFields = ({
    expiration,
    ref_block_num,
    ref_block_prefix,
  }) => {
    return !!(expiration && ref_block_num && ref_block_prefix);
  }
  reverseNibbles = (hex) => {
    const rv = [];
    for (let i = hex.length - 1; i > 0; i -= 2) {
      rv.push(hex[i - 1] + hex[i]);
    }
    return rv.join('');
  }
  getBlockPrefix = (blockIdHex) => {
    const hex = this.reverseNibbles(blockIdHex.substring(16, 24));
    return parseInt(hex, 16);
  }
  getExpiration = (options = {}) => {
    const combinedOptions = Object.assign({}, this.options, options);
    const { expireSeconds } = combinedOptions;
    const currentDate = new Date();
    const timePlus = currentDate.getTime() + (expireSeconds * 1000);
    const timeInISOString = (new Date(timePlus)).toISOString();
    return timeInISOString.substr(0, timeInISOString.length - 1);
  }
  getTransactionHeader = async (expireSeconds) => {
    const info = await this.getInfo();
    const refBlock = {
      timestamp: info.head_block_time,
      block_num: info.last_irreversible_block_num & 0xffff,
      ref_block_prefix: this.getBlockPrefix(info.last_irreversible_block_id),
    };
    return transactionHeader(refBlock, expireSeconds);
  }
  ensureSerializedActions = async (actions) => (await (isObject(actions[0].data))
    ? this.api.serializeActions(actions)
    : actions)
  getInfo = () => this.rpc.get_info()
  getBlock = (height) => this.rpc.get_block(height)
  getAbi = async (account) => {
    // Escape for dot notation
    const escapedAccount = account.replace('.', '\\.');
    if (store.has(escapedAccount)) {
      // Check local store for abi
      const abi = store.get(escapedAccount);
      // Set cache stale for 15 minutes
      const expires = Date.now() - (1000 * 60 * abiCacheMinutes);
      // If cache is not stale, use it
      if (abi.ts > expires) {
        // Cache in our eosjs instance
        this.api.cachedAbis.set(abi.account, abi);
        // Return cached data
        return {
          account_name: abi.account,
          abi: abi.abi,
        };
      }
    }
    // If no cache, retrieve
    const abi = await this.rpc.get_abi(account);
    // Save in local store
    store.set(escapedAccount, {
      ...abi,
      ts: Date.now(),
    });
    // Cache in eosjs instance
    this.api.cachedAbis.set(abi.account_name, abi.abi);
    return abi;
  }
  getRequiredAbis = async (request) => {
    const abis = new Map();
    await Promise.all(request.getRequiredAbis().map(async (account) => {
      abis.set(account, (await this.getAbi(account)).abi);
    }));
    return abis;
  }
}

class LedgerSignatureProvider {
  constructor(config) {
    this.config = config;
    this.rpc = new JsonRpc(config.httpEndpoint);
    this.api = new Api({
      authorityProvider: this.getAuthorityProvider(),
      rpc: this.rpc
    });
    this.ledger = global.hardwareLedger || remote.getGlobal('hardwareLedger');
  }
  getAuthorityProvider() {
    const { rpc } = this;
    return {
      async getRequiredKeys(args) {
        const {
          availableKeys,
          transaction
        } = args;
        return convertLegacyPublicKeys((await rpc.fetch('/v1/chain/get_required_keys', {
          transaction,
          available_keys: convertLegacyPublicKeys(availableKeys),
        })).required_keys);
      }
    };
  }
  async getAvailableKeys() {
    const { transport } = this.ledger;
    const ledgerApi = new LedgerApi(transport);
    const key = await ledgerApi.getPublicKey(this.config.signPath, false);
    return [key.wif];
  }
  async sign({ chainId, serializedTransaction }) {
    const { transport } = this.ledger;
    const ledgerApi = new LedgerApi(transport);
    const { fc } = eosjs1(this.config);
    const tx = this.api.deserializeTransaction(serializedTransaction);
    // Temporary Fix for Ledger + Identity Requests, to add an authorization
    if (tx.actions[0].name === 'identity' && tx.actions[0].authorization.length === 0) {
      const [actor, permission] = this.config.authorization.split('@');
      tx.actions[0].authorization = [{ actor, permission }];
    }
    const buffer = serialize(chainId, tx, fc.types);
    const response = await ledgerApi.signTransaction(this.config.signPath, buffer.toString('hex'));
    return {
      signatures: convertSignatures(response.v + response.r + response.s),
      serializedTransaction: this.api.serializeTransaction(tx),
    };
  }
}

const convertSignatures = (sigs) => {
  if (!Array.isArray(sigs)) {
    sigs = [sigs];
  }
  sigs = [].concat.apply([], sigs);
  for (let i = 0; i < sigs.length; i++) {
    const sig = sigs[i];
    if (typeof sig === 'string' && sig.length === 130) {
      sigs[i] = ecc.Signature.from(sig).toString();
    }
  }
  return sigs;
};

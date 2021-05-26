import { Api, JsonRpc, Serialize } from 'eosjs2';
import ecc from 'eosjs-ecc';
import sha256 from 'fast-sha256';
import { cloneDeep, isObject } from 'lodash';
import {
  APIClient,
  Checksum256,
  PermissionLevel,
  PrivateKey,
  Serializer,
  SignedTransaction,
  Transaction
} from '@greymass/eosio';

import { configureStore } from '../../store/main/configureStore';
import * as ValidateFuel from './ValidateFuel';
import { createHttpHandler } from '../http/handler';
import serialize from '../../actions/helpers/ledger/serialize';

const { SigningRequest } = require('eosio-signing-request');
const zlib = require('zlib');

const opts = {
  zlib: {
    deflateRaw: (data) => new Uint8Array(zlib.deflateRawSync(Buffer.from(data))),
    inflateRaw: (data) => new Uint8Array(zlib.inflateRawSync(Buffer.from(data))),
  }
};

const eosjs1 = require('eosjs');
const { transactionHeader } = require('eosjs2/node_modules/eosjs/dist/eosjs-serialize');
const { stringToPublicKey, publicKeyToString } = require('eosjs2/node_modules/eosjs/dist/eosjs-numeric');
const { JsSignatureProvider } = require('eosjs2/node_modules/eosjs/dist/eosjs-jssig');
const { remote } = require('electron');

const LedgerApi = require('../../actions/helpers/hardware/ledger').default;

// Local store for ABIs
const Store = require('electron-store');

const abiCache = new Store({
  name: 'abis'
});

// Number of minutes to cache the ABI
const abiCacheMinutes = 15;

const fuelEndpoints = {
  aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906: 'http://eos.greymass.com',
  '2a02a0053e5a8cf73a56ba0fda11e4d92e0238a4a2aa74fccf46d5a910746840': 'http://jungle3.greymass.com',
  '4667b205c6838ef70ff7988f6e8257e8be0e1284a2f59699054a018f743b1d11': 'http://telos.greymass.com',
  '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4': 'http://wax.greymass.com',
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
    if (config.clearAlternativePayment) {
      this.clearAlternativePayment = config.clearAlternativePayment;
    }
    if (config.setAlternativePayment) {
      this.setAlternativePayment = config.setAlternativePayment;
    }
    if (config.signMethod === 'ledger') {
      this.signatureProvider = new LedgerSignatureProvider(config);
    } else {
      this.signatureProvider = new JsSignatureProvider(config.keyProvider || []);
    }
    this.initEOSJS(config.httpEndpoint);
    this.options = {
      useLastIrreversible: true,
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
    // If no endpoint, don't initialize the core APIClient
    if (endpoint) {
      this.client = new APIClient({
        url: endpoint
      });
    }
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
            timeout: 20000,
          }).catch((e) => e);
          if (response.isAxiosError) {
            return {
              ok: false,
              json: () => ((response.response) ? response.response.data : {
                message: response.message
              })
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
      rpc: this.rpc,
      signatureProvider: this.signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    Object.keys(abiCache.store).forEach((key) => {
      // Escape storage key
      const storageKey = key.replace(/\./g, '\\.');
      // Load the ABI from localstorage
      const abi = abiCache.get(storageKey);
      if (abi && abi.ts) {
        // Determine if the cache is expired
        const expiredAt = abi.ts + (1000 * 60 * abiCacheMinutes);
        const expired = expiredAt < Date.now();
        // If local cache is not stale, cache it within eosjs
        if (!expired) {
          this.api.cachedAbis.set(abi.account_name, abi);
          return;
        }
      }
      // If no ABI or expired, delete localstorage
      abiCache.delete(storageKey);
    });
  }
  sign(options) {
    return this.signatureProvider.sign(options);
  }
  push(signedTransaction) {
    let { serializedTransaction, signatures } = signedTransaction;
    if (!serializedTransaction && signedTransaction.transaction) {
      serializedTransaction =
        this.api.serializeTransaction(signedTransaction.transaction.transaction);
    }
    if (!signatures && signedTransaction.transaction && signedTransaction.transaction.signatures) {
      ({ signatures } = signedTransaction.transaction);
    }
    return this.api.pushSignedTransaction({ signatures, serializedTransaction });
  }
  async checkResources(chainId, tx, signer) {
    const endpoint = fuelEndpoints[chainId];
    if (endpoint) {
      const unsigned = await this.createTransaction(tx, { sign: false, broadcast: false });
      const req = await SigningRequest.create({
        transaction: unsigned.transaction.transaction,
        chainId,
      }, opts);
      const { httpClient } = await createHttpHandler({});
      try {
        const response = await httpClient.post(`${endpoint}/v1/resource_provider/request_transaction`, {
          request: req.encode(),
          signer,
        });
        if (response && response.data) {
          switch (response.data.code) {
            // Free Transaction
            case 200: {
              const [, requestData] = response.data.data.request;
              // Validate the returned data against the requested data
              await ValidateFuel.validateTransaction(
                signer,
                requestData,
                JSON.parse(JSON.stringify(unsigned.transaction.transaction))
              );
              // So long as the validation doesn't throw an exception, sign the new transaction
              return {
                signatures: response.data.data.signatures,
                transaction: requestData,
              };
            }
            default: {
              break;
            }
          }
        }
      } catch (error) {
        const { response } = error;
        if (response && response.data && response.data.code) {
          switch (response.data.code) {
            case 402: {
              this.setAlternativePayment(response.data);
              return 'fee_required';
            }
            default: {
              this.clearAlternativePayment();
              break;
            }
          }
        }
      }
    }
    return tx;
  }
  async transact(tx, options = false) {
    let transaction = cloneDeep(tx);
    let signatures = [];
    const combinedOptions = Object.assign({}, this.options, options);
    const { chainId } = this.config;
    const signer = PermissionLevel.from(this.config.authorization);
    // If this is not a cold wallet, check to see if Fuel is required.
    if (
      // Ensure we have an endpoint
      this.config.httpEndpoint
      // Ensure the chain is compatible
      && fuelEndpoints[this.config.chainId]
      // Don't try if it's already cosigned
      && String(transaction.actions[0].account) !== 'greymassnoop'
    ) {
      try {
        const response = await this.checkResources(chainId, transaction, signer);
        if (response === 'fee_required') {
          throw new Error('fee_required');
        }
        if (response && response.signatures && response.transaction) {
          ({ signatures, transaction } = response);
        }
      } catch (e) {
        // if a fee was required to complete, throw a resource usage error
        if (e.message === 'fee_required') {
          const error = new Error('resource_usage');
          error.error = {
            name: 'resource_usage'
          };
          throw error;
        }
      }
    }
    // no broadcast + sign = create a v16 format transaction
    //   should likely be converted to use esr payloads
    if (!combinedOptions.broadcast && !combinedOptions.sign) {
      const abis = await Promise.all(transaction.actions.map(async (action) => {
        const { abi } = await this.getAbi(action.account);
        return {
          contract: action.account,
          abi,
        };
      }));
      const unsigned = await this.createTransaction(transaction, combinedOptions, signatures);
      return {
        // contract: abis[0],
        contracts: abis,
        transaction: unsigned
      };
    }
    // issue the transaction with options and config
    const processed = await this.customTransact(transaction, combinedOptions, signatures);
    // no broadcast = create and return the transaction itself
    if (!combinedOptions.broadcast) {
      const deserializedTransaction =
        this.api.deserializeTransaction(processed.serializedTransaction);
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
      let height = info.last_irreversible_block_num;
      if (combinedOptions.blocksBehind) {
        height -= combinedOptions.blocksBehind;
      }
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
  customTransact = async (transaction, {
    broadcast = true,
    sign = true,
    blocksBehind,
    expireSeconds
  }, extraSignatures = []) => {
    let tx;
    const abis = await Promise.all(transaction.actions.map(async (action) => {
      const { abi } = await this.getAbi(action.account);
      return {
        contract: action.account,
        abi,
      };
    }));
    if (!this.hasRequiredTaposFields(transaction)) {
      const info = await this.client.v1.chain.get_info();
      const header = info.getTransactionHeader();
      tx = Transaction.from({
        ...header,
        ...transaction,
      }, abis);
    } else {
      tx = Transaction.from(
        JSON.parse(JSON.stringify(transaction)),
        JSON.parse(JSON.stringify(abis))
      );
    }
    if (!this.hasRequiredTaposFields(tx)) {
      throw new Error('Required configuration or TAPOS fields are not present');
    }
    const serializedTransaction = Serializer.encode({ object: tx }).array;
    let pushTransactionArgs = {
      serializedTransaction,
      signatures: []
    };
    if (sign) {
      if (this.config.signMethod === 'ledger') {
        const availableKeys = await this.signatureProvider.getAvailableKeys();
        pushTransactionArgs = await this.signatureProvider.sign({
          chainId: this.config.chainId,
          requiredKeys: availableKeys,
          serializedTransaction,
          abis,
        });
      } else {
        const privateKey = PrivateKey.from(this.config.keyProvider[0]);
        const digest = tx.signingDigest(Checksum256.from(this.config.chainId));
        const signature = privateKey.signDigest(digest);
        pushTransactionArgs.signatures = [signature.toString()];
      }
    }
    if (extraSignatures.length) {
      pushTransactionArgs.signatures = [
        ...pushTransactionArgs.signatures,
        ...extraSignatures,
      ];
    }
    if (broadcast) {
      const signedTransaction = SignedTransaction.from({
        ...tx,
        signatures: pushTransactionArgs.signatures,
      });
      const result = await this.client.v1.chain.push_transaction(signedTransaction);
      return result;
    }
    return pushTransactionArgs;
  }
  hasRequiredTaposFields = ({
    expiration,
    ref_block_num,
    ref_block_prefix,
  }) => !!(expiration && ref_block_num && ref_block_prefix)
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
  setAbi = (account, abi) => {
    // Escape for dot notation
    const escapedAccount = String(account).replace(/\./g, '\\.');
    // Combine the chainId + escaped name for the storage key
    const storageKey = [this.config.chainId, escapedAccount].join('|');
    // Store in eosjs
    this.api.cachedAbis.set(storageKey, abi);
    // Store in localstorage
    abiCache.set(storageKey, {
      ...abi,
      ts: Date.now(),
    });
  }
  getAbi = async (account) => {
    // Escape for dot notation
    const escapedAccount = String(account).replace(/\./g, '\\.');
    // Combine the chainId + escaped name for the storage key
    const storageKey = [this.config.chainId, escapedAccount].join('|');
    if (abiCache.has(storageKey)) {
      // Check local store for abi
      const abi = abiCache.get(storageKey);
      // Set cache stale for 15 minutes
      const expiredAt = abi.ts + (1000 * 60 * abiCacheMinutes);
      const expired = expiredAt < Date.now();
      // If using cold wallet or cache is not stale, use it
      if (!this.config.httpEndpoint || !expired) {
        // Cache in our eosjs instance
        this.api.cachedAbis.set(account, abi);
        // Return cached data
        return {
          account_name: account,
          abi: abi.abi,
        };
      }
      // otherwise delete it
      abiCache.delete(storageKey);
    }
    // If no cache, retrieve
    const abi = await this.rpc.get_abi(account);
    // Save in local store
    abiCache.set(storageKey, {
      ...abi,
      ts: Date.now(),
    });
    // Cache in eosjs instance
    this.api.cachedAbis.set(abi.account_name, abi);
    return abi;
  }
  getRequiredAbis = async (request) => {
    const abis = new Map();
    await Promise.all(request.getRequiredAbis().map(async (account) => {
      const { abi } = await this.getAbi(account);
      abis.set(account, abi);
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
    const chunks = serialize(chainId, tx, fc.types);
    const response = await ledgerApi.signTransaction(this.config.signPath, chunks);
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

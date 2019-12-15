import { Api, JsonRpc, Serialize } from 'eosjs2';
import ecc from 'eosjs-ecc';
import sha256 from 'fast-sha256';
import { isObject } from 'lodash';

import serialize from '../../actions/helpers/ledger/serialize';

const eosjs1 = require('eosjs');
const { convertLegacyPublicKeys } = require('eosio-signing-request/node_modules/eosjs/dist/eosjs-numeric');
const { JsSignatureProvider } = require('eosio-signing-request/node_modules/eosjs/dist/eosjs-jssig');
const { remote } = require('electron');

const LedgerApi = require('../../actions/helpers/hardware/ledger').default;

const fuelTransaction = {
  account: 'greymassnoop',
  name: 'noop',
  authorization: [
    {
      actor: 'greymassfuel',
      permission: 'cosign',
    }
  ],
  data: {}
};

const testTransaction = {
  account: 'eosio.token',
  name: 'transfer',
  authorization: [
    {
      actor: 'greymassfuel',
      permission: 'cosign',
    }
  ],
  data: {
    to: 'teamgreymass',
    from: 'greymassfuel',
    quantity: '0.0100 EOS',
    memo: ''
  }
};

export default class EOSHandler {
  constructor(config) {
    this.config = config;
    if (config.signMethod === 'ledger') {
      this.signatureProvider = new LedgerSignatureProvider(config);
    } else {
      this.signatureProvider = new JsSignatureProvider(config.keyProvider || []);
    }
    this.rpc = new JsonRpc(config.httpEndpoint);
    this.api = new Api({
      authorityProvider: this.getAuthorityProvider(),
      rpc: this.rpc,
      signatureProvider: this.signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    this.tapos = {
      blocksBehind: 3,
      broadcast: config.broadcast,
      expireSeconds: config.expireInSeconds,
      sign: config.sign,
    };
    return this;
  }
  getAuthorityProvider() {
    const { rpc } = this;
    return {
      async getRequiredKeys(args) {
        const { transaction } = args;
        transaction.actions.forEach((action, ti) => {
          action.authorization.forEach((auth, ai) => {
            if (auth.actor === 'greymassfuel' && auth.permission === 'cosign') {
              delete transaction.actions[ti].authorization.splice(ai, 1);
            }
          });
        });
        return convertLegacyPublicKeys((await rpc.fetch('/v1/chain/get_required_keys', {
          transaction,
          available_keys: args.availableKeys,
        })).required_keys);
      }
    };
  }
  transact(tx) {
    const transaction = Object.assign({}, tx);
    // append Fuel data where appropriate
    if (this.config.greymassfuel) {
      transaction.actions.unshift(fuelTransaction);
    }
    // no broadcast + sign = create a v16 format transaction
    //   should likely be converted to use esr payloads
    if (!this.tapos.broadcast && !this.tapos.sign) {
      return this.createTransaction(transaction, this.tapos);
    }
    // otherwise transact
    return this.api.transact(transaction, this.tapos);
  }
  // return a transaction like v16 would
  createTransaction = async (tx) => {
    const info = await this.rpc.get_info();
    const height = info.last_irreversible_block_num - this.tapos.blocksBehind;
    const blockInfo = await this.rpc.get_block(height);
    const transaction = Object.assign({}, tx, {
      actions: await this.ensureSerializedActions(tx.actions),
      context_free_actions: [],
      transaction_extensions: [],
      expiration: this.getExpiration(),
      ref_block_num: blockInfo.block_num & 0xffff,
      ref_block_prefix: blockInfo.ref_block_prefix,
      max_cpu_usage_ms: 0,
      max_net_usage_words: 0,
      delay_sec: 0,
    });
    const serializedTransaction = this.api.serializeTransaction(transaction);
    return {
      broadcast: false,
      transaction_id: Serialize.arrayToHex(sha256(serializedTransaction)).toLowerCase(),
      transaction: {
        compression: 'none',
        signatures: [],
        transaction
      }
    };
  }
  getExpiration = () => {
    const { expireSeconds } = this.tapos;
    const currentDate = new Date();
    const timePlus = currentDate.getTime() + (expireSeconds * 1000);
    const timeInISOString = (new Date(timePlus)).toISOString();
    return timeInISOString.substr(0, timeInISOString.length - 1);
  }
  ensureSerializedActions = async (actions) => (await (isObject(actions[0].data))
    ? this.api.serializeActions(actions)
    : actions)
  getInfo = () => this.rpc.get_info()
  getBlock = (height) => this.rpc.get_block(height)
  getAbi = (account) => this.rpc.get_abi(account)
  pushTransaction = (tx) => {
    console.log("push", tx)
  }
}

class LedgerSignatureProvider {
  constructor(config) {
    this.config = config;
    this.rpc = new JsonRpc(config.httpEndpoint);
    this.api = new Api({ rpc: this.rpc });
    this.ledger = global.hardwareLedger || remote.getGlobal('hardwareLedger');
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
    const buffer = serialize(chainId, tx, fc.types);
    const response = await ledgerApi.signTransaction(this.config.signPath, buffer.toString('hex'));
    console.log(response)
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
    const sig = sigs[i]
    console.log(sig, i, sigs, sig.length)
    if (typeof sig === 'string' && sig.length === 130) {
      sigs[i] = ecc.Signature.from(sig).toString()
      console.log(sigs)
    }
  }

  return sigs
}

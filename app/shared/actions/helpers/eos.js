import { Api, JsonRpc } from 'eosjs2';

import { decrypt } from '../wallet';
import serialize from './ledger/serialize';

const { remote } = require('electron');
const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');
const Eos = require('eosjs');

const JsSignatureProvider = require('eosjs2/node_modules/eosjs/dist/eosjs-jssig').default;

export default function eos(connection, signing = false, v2 = false) {
  const decrypted = Object.assign({}, connection);
  if (signing && decrypted.keyProviderObfuscated) {
    const {
      hash,
      key
    } = decrypted.keyProviderObfuscated;
    if (hash && key) {
      const wif = decrypt(key, hash, 1).toString(CryptoJS.enc.Utf8);
      if (ecc.isValidPrivate(wif) === true) {
        decrypted.keyProvider = [wif];
      }
    }
  }
  // Remove edgecase where authorization is improperly set
  // TODO: Resolve why they are getting unset in certain edge cases
  if (
    decrypted.authorization
    && (
      decrypted.authorization === []
      || decrypted.authorization === [null]
      || decrypted.authorization === [undefined]
    )
  ) {
    delete decrypted.authorization;
  }

  // Ledger Interception
  if (decrypted.signMethod === 'ledger') {
    const signProvider = async ({ transaction }) => {
      const { fc } = Eos(connection);
      const buffer = serialize(fc.types.config.chainId, transaction, fc.types);
      const { api } = remote.getGlobal('hardwareLedger');
      const result = await api.signTransaction(
        decrypted.signPath,
        buffer.toString('hex')
      );
      const rawSig = result.v + result.r + result.s;
      return rawSig;
    };
    const promiseSigner = args => Promise.resolve(signProvider(args));
    decrypted.signProvider = promiseSigner;
    return Eos(decrypted);
  } else {
    decrypted.signProvider = undefined;
  }

  if (v2 && decrypted.signMethod === 'hot') {
    const signatureProvider = new JsSignatureProvider(decrypted.keyProvider);
    const rpc = new JsonRpc(decrypted.httpEndpoint);
    const api = new Api({
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    return api;
  }

  return Eos(decrypted);
}

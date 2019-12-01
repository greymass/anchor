import { Api, JsonRpc } from 'eosjs2';

import { decrypt } from '../wallet';
import serialize from './ledger/serialize';

const { remote } = require('electron');
const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');
const Eos = require('eosjs');

const { convertLegacyPublicKeys } = require('eosjs2/node_modules/eosjs/dist/eosjs-numeric');
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

  if (v2 && decrypted.signMethod === false) {
    const signatureProvider = new JsSignatureProvider(decrypted.keyProvider);
    const rpc = new JsonRpc(decrypted.httpEndpoint);
    class CosignAuthorityProvider {
      async getRequiredKeys(args) {
        const { transaction } = args;
        // Iterate over the actions and authorizations
        transaction.actions.forEach((action, ti) => {
          action.authorization.forEach((auth, ai) => {
            // If the authorization matches the expected cosigner
            //   then remove it from the transaction while checking
            //   for what public keys are required
            if (
              auth.actor === 'greymassfuel'
              && auth.permission === 'cosign'
            ) {
              delete transaction.actions[ti].authorization.splice(ai, 1);
            }
          });
        });
        return convertLegacyPublicKeys((await rpc.fetch('/v1/chain/get_required_keys', {
          transaction,
          available_keys: args.availableKeys,
        })).required_keys);
      }
    }
    const api = new Api({
      authorityProvider: new CosignAuthorityProvider(),
      rpc,
      signatureProvider,
      textDecoder: new TextDecoder(),
      textEncoder: new TextEncoder()
    });
    return api;
  }

  return Eos(decrypted);
}

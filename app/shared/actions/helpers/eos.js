import { decrypt } from '../wallet';

const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');
const Eos = require('eosjs');

export default function eos(connection, signing = false) {
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
    && (decrypted.authorization === [null] || decrypted.authorization === [undefined])
  ) {
    delete decrypted.authorization;
  }
  return Eos(decrypted);
}

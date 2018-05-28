import * as types from './types';

const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');

export function setWalletKey(settings, key, password) {
  return (dispatch: () => void) => {
    const data = encrypt(key, password);
    return dispatch({
      type: types.SET_WALLET_KEY,
      payload: {
        account: settings.account,
        data,
        key
      }
    });
  };
}

export function setTemporaryKey(settings, key) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_TEMPORARY_KEY,
      payload: {
        account: settings.account,
        key
      }
    });
  };
}

export function lockWallet() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.WALLET_LOCK
    });
  };
}

export function removeWallet() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.WALLET_REMOVE
    });
  };
}

export function unlockWallet(wallet, password) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.VALIDATE_WALLET_PASSWORD_PENDING
    });
    const key = decrypt(wallet.data, password).toString(CryptoJS.enc.Utf8);
    if (ecc.isValidPrivate(key) === true) {
      return dispatch({
        payload: {
          account: wallet.account,
          key
        },
        type: types.VALIDATE_WALLET_PASSWORD_SUCCESS
      });
    }
    return dispatch({
      type: types.VALIDATE_WALLET_PASSWORD_FAILURE
    });
  };
}

function encrypt(msg, pass) {
  const keySize = 256;
  const iterations = 10000;
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = CryptoJS.PBKDF2(pass, salt, {
    iterations,
    keySize: keySize / 32
  });
  const iv = CryptoJS.lib.WordArray.random(128 / 8);
  const encrypted = CryptoJS.AES.encrypt(msg, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return salt.toString() + iv.toString() + encrypted.toString();
}

function decrypt(transitmessage, pass) {
  const keySize = 256;
  const iterations = 10000;
  const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
  const encrypted = transitmessage.substring(64);
  const key = CryptoJS.PBKDF2(pass, salt, {
    iterations,
    keySize: keySize / 32
  });
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return decrypted;
}

export default {
  lockWallet,
  unlockWallet,
  removeWallet,
  setTemporaryKey,
  setWalletKey
};

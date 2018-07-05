import * as types from './types';
import { setSetting } from './settings';

const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');

export function setWalletKey(key, password, mode = 'hot') {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    dispatch({
      type: types.SET_WALLET_KEYS_ACTIVE,
      payload: {
        account: settings.account,
        key
      }
    });
    return dispatch({
      type: types.SET_WALLET_ACTIVE,
      payload: {
        account: settings.account,
        data: encrypt(key, password),
        mode
      }
    });
  };
}

export function setTemporaryKey(key) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    dispatch({
      type: types.SET_WALLET_KEYS_TEMPORARY,
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

export function validateWalletPassword(password) {
  return (dispatch: () => void, getState) => {
    const {
      wallet
    } = getState();
    dispatch({
      type: types.VALIDATE_WALLET_PASSWORD_PENDING
    });
    setTimeout(() => {
      try {
        const key = decrypt(wallet.data, password).toString(CryptoJS.enc.Utf8);
        if (ecc.isValidPrivate(key) === true) {
          return dispatch({
            type: types.VALIDATE_WALLET_PASSWORD_SUCCESS
          });
        }
      } catch (err) {
        return dispatch({
          err,
          type: types.VALIDATE_WALLET_PASSWORD_FAILURE
        });
      }
      return dispatch({
        type: types.VALIDATE_WALLET_PASSWORD_FAILURE
      });
    }, 10);
  };
}

export function unlockWallet(password) {
  return (dispatch: () => void, getState) => {
    const {
      wallet
    } = getState();
    dispatch({
      type: types.VALIDATE_WALLET_PASSWORD_PENDING
    });
    setTimeout(() => {
      try {
        const key = decrypt(wallet.data, password).toString(CryptoJS.enc.Utf8);
        if (ecc.isValidPrivate(key) === true) {
          // Set the active wallet
          dispatch({
            payload: wallet,
            type: types.SET_WALLET_ACTIVE
          });
          // Set the keys for use
          dispatch({
            payload: {
              account: wallet.account,
              key
            },
            type: types.SET_WALLET_KEYS_ACTIVE
          });
          return dispatch({
            type: types.VALIDATE_WALLET_PASSWORD_SUCCESS
          });
        }
      } catch (err) {
        return dispatch({
          err,
          type: types.VALIDATE_WALLET_PASSWORD_FAILURE
        });
      }
      return dispatch({
        type: types.VALIDATE_WALLET_PASSWORD_FAILURE
      });
    }, 10);
  };
}

export function setWalletMode(walletMode) {
  return (dispatch: () => void) => {
    // Set the wallet mode
    dispatch(setSetting('walletMode', walletMode));
    switch (walletMode) {
      case 'cold': {
        // Remove any connection string we had
        dispatch(setSetting('node', null));
        return dispatch({
          type: types.SET_WALLET_COLD
        });
      }
      case 'watch': {
        return dispatch({
          type: types.SET_WALLET_WATCH
        });
      }
      default: {
        return dispatch({
          type: types.SET_WALLET_HOT
        });
      }
    }
  };
}

export function encrypt(msg, pass) {
  const keySize = 256;
  const iterations = 4500;
  const salt = CryptoJS.lib.WordArray.random(128 / 8);
  const key = CryptoJS.PBKDF2(pass, salt, {
    iterations,
    keySize: keySize / 4
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
  const iterations = 4500;
  const salt = CryptoJS.enc.Hex.parse(transitmessage.substr(0, 32));
  const iv = CryptoJS.enc.Hex.parse(transitmessage.substr(32, 32));
  const encrypted = transitmessage.substring(64);
  const key = CryptoJS.PBKDF2(pass, salt, {
    iterations,
    keySize: keySize / 4
  });
  const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
    iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC
  });
  return decrypted;
}

export default {
  decrypt,
  encrypt,
  lockWallet,
  unlockWallet,
  removeWallet,
  setTemporaryKey,
  setWalletKey,
  validateWalletPassword
};

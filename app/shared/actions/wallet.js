import * as types from './types';
import * as validate from './validate';

const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');

export function setWalletKey(settings, key, password) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_WALLET_KEY,
      payload: {
        account: settings.account,
        data: CryptoJS.AES.encrypt(key, password).toString(),
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
    try {
      const decrypted = CryptoJS.AES.decrypt(wallet.data, password);
      const key = decrypted.toString(CryptoJS.enc.Utf8);
      if (ecc.isValidPrivate(key) === true) {
        return dispatch({
          payload: {
            account: wallet.account,
            key
          },
          type: types.VALIDATE_WALLET_PASSWORD_SUCCESS
        });
      }
    } catch (e) {
      console.error(e);
    }
    return dispatch({
      type: types.VALIDATE_WALLET_PASSWORD_FAILURE
    });
  };
}

export default {
  removeWallet,
  setTemporaryKey,
  setWalletKey
};

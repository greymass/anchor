import { find, forEach, partition, pluck, uniq } from 'lodash';

import * as types from './types';
import { decrypt, encrypt } from './wallet';

const CryptoJS = require('crypto-js');

function setStorage(data) {
  return async (dispatch: () => void) => {
    // flush to disk
    if (window && window.persistor) {
      setTimeout(window.persistor.flush, 2000);
    }
    // update store
    return dispatch({
      type: types.WALLET_STORAGE_UPDATE,
      payload: data
    });
  };
}

function removeKeyFromStorageByPublic(password, pubkey) {
  return async (dispatch: () => void, getState) => {
    const { storage } = getState();
    if (storage.data) {
      // Decrypt storage
      const decrypted = JSON.parse(decrypt(storage.data, password).toString(CryptoJS.enc.Utf8));

      // Determine which keys to remove and which to keep
      const [, keep] = partition(decrypted, (e) => e.pubkey === pubkey);

      // Clone our paths
      const paths = Object.assign({}, storage.paths);

      // Remove the associated path to this key if it exists
      if (paths[pubkey]) {
        delete paths[pubkey];
      }

      // Determine available public keys based on stored keys and derivation paths
      const keys = uniq([
        ...keep.map(k => k.pubkey),
        ...Object.keys(paths),
      ]);

      // Encrypt new storage
      const data = encrypt(JSON.stringify(keep), password);

      // Set the wallet storage to match the new configuration
      dispatch(setStorage({ data, keys, paths }));
    }
  };
}

export {
  removeKeyFromStorageByPublic,
  setStorage
};

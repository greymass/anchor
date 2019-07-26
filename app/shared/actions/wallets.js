import { find, forEach, partition, pluck, uniq } from 'lodash';

import * as types from './types';
import { getAccount } from './accounts';
import { setSettings } from './settings';
import { decrypt, encrypt, setWalletMode } from './wallet';

import EOSAccount from '../utils/EOS/Account';
import eos from './helpers/eos';

const async = require("async");
const ecc = require('eosjs-ecc');
const CryptoJS = require('crypto-js');

export function completeConvertToLedger(
  account,
  authorization,
  publicKey,
  path,
) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const { chainId } = settings;
    dispatch(removeWallet(
      chainId,
      account,
      authorization,
    ));
    dispatch(importWallet(
      chainId,
      account,
      authorization,
      false,
      false,
      'ledger',
      publicKey,
      path
    ));
    dispatch(setWalletMode('ledger'));
    dispatch(useWallet(chainId, account, authorization));
    return dispatch({
      type: types.PREPARE_WALLET_CONVERT_LEDGER_COMPLETE,
      payload: {
        account,
        authorization,
        chainId,
        mode: 'ledger',
        path,
        pubkey: publicKey,
      }
    });
  };
}

export function duplicateWallet(account, authorization, chainDuplicatingTo, chainDuplicatingFrom) {
  return (dispatch: () => void, getState) => {
    const { wallets } = getState();
    const currentWallet = find(wallets, { chainId: chainDuplicatingFrom, authorization, account });
    const newWallet = Object.assign({}, currentWallet, { chainId: chainDuplicatingTo });

    return dispatch({
      type: types.ADD_WALLET,
      payload: newWallet
    });
  };
}

export function prepareConvertToLedger(
  account,
  authorization,
  path,
  publicKey,
) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const { chainId } = settings;
    return dispatch({
      type: types.PREPARE_WALLET_CONVERT_LEDGER,
      payload: {
        account,
        authorization,
        chainId,
        mode: 'ledger',
        path,
        publicKey
      }
    });
  };
}

export function prepareConvertToLedgerAbort(
  account,
  authorization
) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const { chainId } = settings;
    return dispatch({
      type: types.PREPARE_WALLET_CONVERT_LEDGER_ABORT,
      payload: {
        account,
        authorization,
        chainId,
        mode: 'ledger'
      }
    });
  };
}

export function importWalletFromBackup(wallet, settings = {}) {
  return (dispatch: () => void) => {
    let mode = wallet.mode || 'watch';
    if (wallet.path) mode = 'ledger';
    if (wallet.data) mode = 'hot';
    if (settings.walletMode === 'cold') mode = 'cold';
    return dispatch({
      type: types.IMPORT_WALLET_KEY,
      payload: {
        account: wallet.account,
        authorization: wallet.authority,
        chainId: wallet.chainId,
        data: wallet.data,
        mode: wallet.mode || mode,
        path: wallet.path,
        pubkey: wallet.pubkey
      }
    });
  };
}

function importPubkeyStorage(pubkey, path) {
  return (dispatch: () => void, getState) => {
    const { storage } = getState();
    // Add the pubkey to the keys array
    const keys = uniq([
      ...storage.keys,
      ...[pubkey]
    ]);
    // Modify path storage to record where this key was accessed from
    const paths = { ...storage.paths };
    paths[pubkey] = path;
    return dispatch({
      type: types.WALLET_STORAGE_UPDATE,
      payload: {
        data: storage.data,
        keys,
        paths,
      }
    });
  };
}


function importKeyStorage(
  password = false,
  key = false,
  pubkey = undefined,
) {
  return (dispatch: () => void, getState) => {
    const { storage } = getState();
    let data;
    if (storage.data) {
      // Decrypt storage
      const decrypted = JSON.parse(decrypt(storage.data, password).toString(CryptoJS.enc.Utf8));
      // Generate the new record
      const record = { key, pubkey };
      // Pull the other records from storage
      const [, other] = partition(decrypted, { pubkey });
      // Merge new entry with array
      data = [record, ...other];
    } else {
      // Establish a new array of keys
      data = [{
        key,
        pubkey
      }];
    }
    // Encrypt and store
    const keys = data.map(k => k.pubkey);
    const encrypted = encrypt(JSON.stringify(data), password);
    return dispatch({
      type: types.WALLET_STORAGE_UPDATE,
      payload: {
        data: encrypted,
        keys,
      }
    });
  };
}

export function importKeypairStorage(
  password = false,
  keypairs = [],
) {
  return (dispatch: () => void, getState) => {
    const { storage } = getState();
    let data;
    // Generate the new records
    const records = keypairs.map(([pubkey, key]) => ({ key, pubkey }));
    // Ensure no duplicates by retrieving all non-matching existing records
    const newKeys = records.map(k => k.pubkey);
    if (storage.data) {
      // Decrypt storage
      const decrypted = JSON.parse(decrypt(storage.data, password).toString(CryptoJS.enc.Utf8));
      const [, other] = partition(decrypted, (e) => newKeys.includes(e.pubkey));
      // Merge new records with existing array
      data = [...records, ...other];
    } else {
      // Establish a new array of keys
      data = [...records];
    }
    const keys = uniq([
      ...data.map(k => k.pubkey),
      ...Object.keys(storage.paths),
    ]);
    // Encrypt and store
    const encrypted = encrypt(JSON.stringify(data), password);
    return dispatch({
      type: types.WALLET_STORAGE_UPDATE,
      payload: {
        data: encrypted,
        keys,
      }
    });
  };
}

export function importWallet(
  chainId,
  account,
  authorization = false,
  key = false,
  password = false,
  mode = 'hot',
  publicKey = undefined,
  path = undefined,
) {
  return (dispatch: () => void, getState) => {
    const { accounts, storage, settings } = getState();
    const accountData = accounts[account];
    let pubkey = (key) ? ecc.privateToPublic(key) : publicKey;
    if (!pubkey && accountData) {
      const auths = new EOSAccount(accountData).getKeysForAuthorization(authorization);
      if (auths.length > 0) {
        ([{ pubkey }] = auths);
      }
    }
    // Import key into permanant storage
    if (key && password) {
      dispatch(importKeyStorage(password, key, pubkey));
    }
    let detectedPath = path;
    // If no path was passed, but it's a known key to a path, set it
    if (!detectedPath && publicKey && storage.paths[publicKey]) {
      detectedPath = storage.paths[publicKey]
    }
    // If a path was exists, this is a hardware wallet and we need to record the pubkey
    if (detectedPath) {
      dispatch(importPubkeyStorage(pubkey, detectedPath));
    }
    // Detect if the current account/authorization is being reimported/replaced, and set mode
    if (
      settings.account === account
      && settings.authorization === authorization
    ) {
      dispatch(setSettings(Object.assign({}, settings, {
        walletMode: mode
      })));
    }
    // as long as this isn't an offline wallet, ensure the blockchain exists
    if (settings.walletMode !== 'cold') {
      dispatch({
        type: types.SYSTEM_BLOCKCHAINS_ENSURE,
        payload: {
          chainId,
          node: settings.node,
        }
      });
    }
    const modeChange = (detectedPath && ['unknown', 'ledger'].includes(mode)) ? 'ledger' : 'hot';
    return dispatch({
      type: types.IMPORT_WALLET_KEY,
      payload: {
        account,
        accountData,
        authorization,
        chainId,
        mode: (modeChange) ? modeChange : mode,
        path: detectedPath,
        pubkey
      }
    });
  };
}

export function importWallets(
  chainId,
  accounts,
  authorization = false,
  key = false,
  password = false,
  mode = 'hot'
) {
  return (dispatch: () => void) =>
    forEach(accounts, (account) =>
      dispatch(importWallet(chainId, account, authorization, key, password, mode)));
}

export function removeWallet(chainId, account, authorization) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.REMOVE_WALLET,
      payload: {
        account,
        authorization,
        chainId,
      }
    });
  };
}

export function useWallet(chainId, account, authorization) {
  return (dispatch: () => void, getState) => {
    const { auths, wallet, wallets } = getState();
    // Find the wallet by account name + authorization when possible
    const walletQuery = { account, chainId };
    if (authorization) {
      // To be able to find legacy wallets, only add authorization to the query if defined
      walletQuery.authorization = authorization;
    }
    const newWallet = find(wallets, walletQuery);
    // Lock the wallet to remove old account keys
    // dispatch({
    //   type: types.WALLET_LOCK
    // });
    //  Reset the unregistered producers
    dispatch({
      type: types.SET_UNREGISTERED_PRODUCERS,
      payload: { unregisteredProducers: [] }
    });
    // Set the wallet mode configuration
    dispatch(setWalletMode(newWallet.mode));
    // Update the settings for the current account
    dispatch(setSettings({
      account,
      authorization
    }));
    if (newWallet.path) {
      dispatch({
        type: types.SET_CURRENT_WALLET,
        payload: newWallet
      });
    }
    if (newWallet.mode === 'hot') {
      const existingKey = find(auths.keystore, { pubkey: newWallet.pubkey });
      if (existingKey) {
        const { hash, key } = existingKey;
        dispatch({
          payload: {
            account: newWallet.account,
            authorization: newWallet.authorization,
            hash,
            key,
            pubkey: newWallet.pubkey,
          },
          type: types.SET_CURRENT_KEY
        });
      }
    }
    if (newWallet.mode !== 'cold') {
      // Update the account in local state
      dispatch(getAccount(account));
    }
    if (newWallet.account !== wallet.account || newWallet.authorization !== wallet.authorization) {
      // Set the active wallet to remember the last used
      return dispatch({
        type: types.SET_CURRENT_WALLET,
        payload: newWallet
      });
    }
  };
}

// Upgrades a legacy hot wallet to the newest version
export function upgradeWallet(chainId, account, authorization, password = false, swap = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      wallets
    } = getState();
    const partitionQuery = {
      account,
      chainId
    };
    if (authorization) {
      partitionQuery.authorization = authorization;
    }
    const [current] = partition(wallets, partitionQuery);
    if (current.length > 0) {
      eos(connection).getAccount(account).then((accountData) => {
        const wallet = current[0];
        const key = decrypt(wallet.data, password).toString(CryptoJS.enc.Utf8);
        const pubkey = (key) ? ecc.privateToPublic(key) : undefined;
        const derived = new EOSAccount(accountData).getAuthorization(pubkey);
        const [, auth] = derived.split('@');
        dispatch({
          type: types.UPGRADE_WALLET,
          payload: {
            account,
            accountData,
            authorization: auth,
            chainId,
            mode: wallet.mode || 'hot',
            oldAuthorization: wallet.authorization,
            pubkey,
          }
        });
        if (swap === true) {
          dispatch(useWallet(chainId, account, auth));
        }
        return false;
      }).catch((err) => dispatch({
        type: types.GET_ACCOUNT_FAILURE,
        payload: { err, account_name: account },
      }));
    }
  };
}

// Upgrades a legacy watch wallet (with no authorization) to a watch wallet with set authorization
export function upgradeWatchWallet(chainId, account, authorization, swap = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      wallets
    } = getState();
    const [current] = partition(wallets, {
      account,
      authorization: false,
      chainId,
      mode: 'watch'
    });
    if (current.length > 0) {
      eos(connection).getAccount(account).then((accountData) => {
        const model = new EOSAccount(accountData);
        const keys = model.getKeysForAuthorization(authorization);
        if (keys.length > 0) {
          const { pubkey } = keys[0];
          dispatch({
            type: types.UPGRADE_WALLET,
            payload: {
              account,
              accountData,
              authorization,
              chainId: connection.chainId,
              mode: 'watch',
              oldAuthorization: false,
              pubkey,
            }
          });
          if (swap === true) {
            dispatch(useWallet(current.chainId, account, authorization));
          }
        }
        return false;
      }).catch((err) => dispatch({
        type: types.GET_ACCOUNT_FAILURE,
        payload: { err, account_name: account },
      }));
    }
  };
}

async function upgradeV1Wallet(wallet, password, dispatch) {
  // Decrypt key and determine public key
  const key = decrypt(wallet.data, password).toString(CryptoJS.enc.Utf8);
  const pubkey = ecc.privateToPublic(key);
  // Create a modified version without the encrypted info for storage
  const modified = Object.assign({}, wallet);
  modified.data = undefined;
  // Update the wallet storage
  dispatch({
    type: types.ADD_WALLET,
    payload: modified
  });
  // Dispatch progress
  dispatch({
    type: types.SYSTEM_V1UPGRADE_PROGRESS,
    payload: {
      account: wallet.account,
      authorization: wallet.authorization,
    }
  });
  return {
    key,
    pubkey,
  };
}

export function upgradeV1Wallets(wallets, password) {
  return async (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_V1UPGRADE_PENDING,
      payload: {
        total: wallets.length
      }
    });
    setTimeout(async () => {
      const requests = wallets.map(async (wallet) => upgradeV1Wallet(wallet, password, dispatch));
      const results = await Promise.all(requests);
      const keys = uniq(results.map(k => k.pubkey));
      const encrypted = encrypt(JSON.stringify(results), password);
      dispatch({
        type: types.WALLET_STORAGE_UPDATE,
        payload: {
          data: encrypted,
          keys,
        }
      });
      // Dispatch success
      return dispatch({
        type: types.SYSTEM_V1UPGRADE_SUCCESS,
        payload: {
          total: wallets.length
        }
      });
    }, 250);
  };
}

export default {
  completeConvertToLedger,
  importKeyStorage,
  importKeypairStorage,
  importWallet,
  importWalletFromBackup,
  importWallets,
  prepareConvertToLedger,
  prepareConvertToLedgerAbort,
  upgradeV1Wallets,
  upgradeWallet,
  upgradeWatchWallet,
  useWallet,
  removeWallet,
};

import { find, forEach, partition } from 'lodash';

import * as types from './types';
import { getAccount } from './accounts';
import { setSettings } from './settings';
import { decrypt, encrypt, setWalletMode } from './wallet';

import EOSAccount from '../utils/EOS/Account';
import eos from './helpers/eos';

const ecc = require('eosjs-ecc');
const CryptoJS = require('crypto-js');

export function completeConvertToLedger(
  account,
  authorization,
  publicKey,
  path,
) {
  return (dispatch: () => void) => {
    dispatch(removeWallet(
      account,
      authorization
    ));
    dispatch(importWallet(
      account,
      authorization,
      false,
      false,
      'ledger',
      publicKey,
      path
    ));
    dispatch(setWalletMode('ledger'));
    return dispatch({
      type: types.PREPARE_WALLET_CONVERT_LEDGER_COMPLETE,
      payload: {
        account,
        authorization,
        mode: 'ledger',
      }
    });
  };
}

export function prepareConvertToLedger(
  account,
  authorization,
  path,
  publicKey,
) {
  return (dispatch: () => void) =>
    dispatch({
      type: types.PREPARE_WALLET_CONVERT_LEDGER,
      payload: {
        account,
        authorization,
        mode: 'ledger',
        path,
        publicKey
      }
    });
}

export function prepareConvertToLedgerAbort(
  account,
  authorization
) {
  return (dispatch: () => void) =>
    dispatch({
      type: types.PREPARE_WALLET_CONVERT_LEDGER_ABORT,
      payload: {
        account,
        authorization,
        mode: 'ledger'
      }
    });
}

export function importWallet(
  account,
  authorization = false,
  key = false,
  password = false,
  mode = 'hot',
  publicKey = undefined,
  path = undefined,
) {
  return (dispatch: () => void, getState) => {
    const { accounts } = getState();
    const data = (key && password) ? encrypt(key, password) : undefined;
    const accountData = accounts[account];
    let pubkey = (key) ? ecc.privateToPublic(key) : publicKey;
    if (!pubkey && accountData) {
      const auths = new EOSAccount(accountData).getKeysForAuthorization(authorization);
      if (auths.length > 0) {
        ([{ pubkey }] = auths);
      }
    }
    return dispatch({
      type: types.IMPORT_WALLET_KEY,
      payload: {
        account,
        accountData,
        authorization,
        data,
        mode,
        path,
        pubkey
      }
    });
  };
}

export function importWallets(
  accounts,
  authorization = false,
  key = false,
  password = false,
  mode = 'hot'
) {
  return (dispatch: () => void) =>
    forEach(accounts, (account) =>
      dispatch(importWallet(account, authorization, key, password, mode)));
}

export function removeWallet(account, authorization) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.REMOVE_WALLET,
      payload: {
        account,
        authorization
      }
    });
  };
}

export function useWallet(account, authorization) {
  return (dispatch: () => void, getState) => {
    const { wallet, wallets } = getState();
    // Find the wallet by account name + authorization
    let newWallet = find(wallets, { account, authorization });
    // If the wallet doesn't match both, try just account name
    if (!newWallet) {
      newWallet = find(wallets, { account });
    }
    // Lock the wallet to remove old account keys
    dispatch({
      type: types.WALLET_LOCK
    });
    // Set the wallet mode configuration
    dispatch(setWalletMode(newWallet.mode));
    // Update the settings for the current account
    dispatch(setSettings({
      account,
      authorization
    }));
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
export function upgradeWallet(account, authorization, password = false, swap = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      wallets
    } = getState();
    const [current] = partition(wallets, {
      account,
      authorization
    });
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
            oldAuthorization: wallet.authorization,
            pubkey,
          }
        });
        if (swap === true) {
          dispatch(useWallet(account, auth));
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
export function upgradeWatchWallet(account, authorization, swap = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      wallets
    } = getState();
    const [current] = partition(wallets, {
      account,
      authorization: false,
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
              oldAuthorization: false,
              pubkey,
            }
          });
          if (swap === true) {
            dispatch(useWallet(account, authorization));
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

export default {
  completeConvertToLedger,
  importWallet,
  importWallets,
  prepareConvertToLedger,
  prepareConvertToLedgerAbort,
  upgradeWallet,
  upgradeWatchWallet,
  useWallet,
  removeWallet,
};

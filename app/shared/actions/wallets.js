import { find, forEach } from 'lodash';

import * as types from './types';
import { getAccount } from './accounts';
import { setSettings } from './settings';
import { encrypt } from './wallet';

export function importWallet(account, key = false, password = false, mode = 'hot') {
  const data = (key && password) ? encrypt(key, password) : false;
  return (dispatch: () => void) => dispatch({
    type: types.IMPORT_WALLET_KEY,
    payload: {
      account,
      data,
      mode
    }
  });
}

export function importWallets(accounts, key = false, password = false, mode = 'hot') {
  return (dispatch: () => void) =>
    forEach(accounts, (account) => dispatch(importWallet(account, key, password, mode)));
}

export function removeWallet(account) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.REMOVE_WALLET,
      payload: {
        account
      }
    });
  };
}

export function useWallet(account) {
  return (dispatch: () => void, getState) => {
    const { wallets } = getState();
    // Find the wallet by account name
    const wallet = find(wallets, { account });
    // Lock the wallet to remove old account keys
    dispatch({
      type: types.WALLET_LOCK
    });
    if (wallet.mode !== 'cold') {
      console.log(wallet)
      // Update the settings for the current account
      dispatch(setSettings({
        account,
        walletMode: wallet.mode
      }));
      // Update the account in local state
      dispatch(getAccount(account));
    }
    // Set the active wallet to remember the last used
    return dispatch({
      type: types.SET_WALLET_ACTIVE,
      payload: wallet
    });
  };
}

export default {
  importWallet,
  importWallets,
  useWallet
};

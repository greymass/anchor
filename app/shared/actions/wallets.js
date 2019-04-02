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

export function importWalletFromBackup(wallet) {
  return (dispatch: () => void) => {
    let mode = 'watch';
    if (wallet.type === 'key' && wallet.data) {
      mode = 'hot';
    }
    if (wallet.type === 'ledger' && wallet.path) {
      mode = 'ledger';
    }
    return dispatch({
      type: types.IMPORT_WALLET_KEY,
      payload: {
        account: wallet.account,
        authorization: wallet.authority,
        chainId: wallet.chainId,
        data: wallet.data,
        mode,
        path: wallet.path,
        pubkey: wallet.pubkey
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
    const { accounts, settings } = getState();
    const data = (key && password) ? encrypt(key, password) : undefined;
    const accountData = accounts[account];
    let pubkey = (key) ? ecc.privateToPublic(key) : publicKey;
    if (!pubkey && accountData) {
      const auths = new EOSAccount(accountData).getKeysForAuthorization(authorization);
      if (auths.length > 0) {
        ([{ pubkey }] = auths);
      }
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
    return dispatch({
      type: types.IMPORT_WALLET_KEY,
      payload: {
        account,
        accountData,
        authorization,
        chainId,
        data,
        mode,
        path,
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
    const { wallet, wallets } = getState();
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
      partitionQuery.authorization = authorization
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

export default {
  completeConvertToLedger,
  importWallet,
  importWalletFromBackup,
  importWallets,
  prepareConvertToLedger,
  prepareConvertToLedgerAbort,
  upgradeWallet,
  upgradeWatchWallet,
  useWallet,
  removeWallet,
};

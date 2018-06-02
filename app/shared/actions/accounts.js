import * as types from './types';

import eos from './helpers/eos';

export function clearAccountCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_ACCOUNT_CACHE
    });
  };
}

export function getAccount(account = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_REQUEST,
      payload: { account_name: account }
    });
    const {
      connection,
      settings
    } = getState();
    if (account && (settings.node || settings.node.length !== 0)) {
      eos(connection).getAccount(account).then((results) => {
        // Trigger the action to load this accounts balances
        dispatch(getCurrencyBalance(account));
        // Dispatch the results of the account itself
        return dispatch({
          type: types.GET_ACCOUNT_SUCCESS,
          payload: { results }
        });
      }).catch((err) => dispatch({
        type: types.GET_ACCOUNT_FAILURE,
        payload: { err, account_name: account },
      }));
      return;
    }
    dispatch({
      type: types.GET_ACCOUNT_FAILURE,
      payload: { account_name: account },
    });
  };
}

export function getCurrencyBalance(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_BALANCE_REQUEST,
      payload: { account_name: account }
    });
    const {
      connection,
      settings
    } = getState();
    if (account && (settings.node || settings.node.length !== 0)) {
      return eos(connection).getCurrencyBalance('eosio.token', account).then((balances) => dispatch({
        type: types.GET_ACCOUNT_BALANCE_SUCCESS,
        payload: { balances, account_name: account }
      })).catch((err) => dispatch({
        type: types.GET_ACCOUNT_BALANCE_FAILURE,
        payload: { err, account_name: account }
      }));
    }
    dispatch({
      type: types.GET_ACCOUNT_BALANCE_FAILURE,
      payload: { account_name: account },
    });
  };
}

export function getAccountByKey(key) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_BY_KEY_REQUEST,
      payload: { key }
    });
    const {
      connection,
      settings
    } = getState();
    if (key && (settings.node || settings.node.length !== 0)) {
      return eos(connection).getKeyAccounts(key).then((accounts) => {
        return dispatch({
          type: types.GET_ACCOUNT_BY_KEY_SUCCESS,
          payload: { accounts }
        });
      }).catch((err) => dispatch({
        type: types.GET_ACCOUNT_BY_KEY_FAILURE,
        payload: { err, key }
      }));
    }
    dispatch({
      type: types.GET_ACCOUNT_BY_KEY_FAILURE,
      payload: { key },
    });
  };
}

export function clearAccountByKey() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.GET_ACCOUNT_BY_KEY_CLEAR
    });
  };
}

export default {
  clearAccountByKey,
  clearAccountCache,
  getAccount,
  getAccountByKey,
  getCurrencyBalance
};

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

export default {
  clearAccountCache,
  getAccount,
  getCurrencyBalance
};

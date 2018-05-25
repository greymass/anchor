import * as types from './types';

const Eos = require('eosjs');

export function clearAccountCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_ACCOUNT_CACHE
    });
  };
}

export function getAccount(settings, account = '') {
  return (dispatch: () => void) => {
    const eos = Eos.Localnet({ httpEndpoint: settings.node });
    dispatch({
      type: types.GET_ACCOUNT_REQUEST,
      payload: { account_name: account }
    });
    if (settings.node || settings.node.length === 0) {
      let loadAccount = account;
      if (!loadAccount && settings.account) loadAccount = settings.account;
      eos.getAccount(loadAccount).then((results) => dispatch({
        type: types.GET_ACCOUNT_SUCCESS,
        payload: { results }
      })).catch((err) => dispatch({
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

export default {
  clearAccountCache,
  getAccount
};

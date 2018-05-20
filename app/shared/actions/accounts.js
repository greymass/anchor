import { send } from 'redux-electron-ipc';
import * as types from './types';

const Eos = require('eosjs');

export function getAccount(settings, account = '') {
  const eos = Eos.Localnet({ httpEndpoint: settings.node });
  let loadAccount = account;
  if (!loadAccount && settings.account) loadAccount = settings.account;
  return (dispatch: () => void) => {
    dispatch({
      type: types.GET_ACCOUNT_REQUEST
    });
    eos.getAccount(loadAccount).then((results) => dispatch({
      type: types.GET_ACCOUNT_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_ACCOUNT_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getAccount
};

import { send } from 'redux-electron-ipc';
import * as types from './types';

const Eos = require('eosjs');

const eos = Eos.Localnet({
  // keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'],
  // httpEndpoint: 'http://192.168.1.4:8888',
  // debug: true,
  httpEndpoint: 'https://eos.jesta.us',
  broadcast: true,
  sign: true
});

export function getAccount(account = '') {
  return (dispatch: () => void) => {
    dispatch({
      type: types.GET_ACCOUNT_REQUEST
    });
    eos.getAccount(account).then((results) => dispatch({
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

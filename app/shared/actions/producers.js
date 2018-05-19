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

export function getProducers() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.GET_PRODUCERS_REQUEST
    });
    eos.getTableRows(true, 'eosio', 'eosio', 'producers').then((results) => dispatch({
      type: types.GET_PRODUCERS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_PRODUCERS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getProducers
};

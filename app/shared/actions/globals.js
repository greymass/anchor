import * as types from './types';

const Eos = require('eosjs');

export function getGlobals(settings) {
  const eos = Eos.Localnet({ httpEndpoint: settings.node });
  return (dispatch: () => void) => {
    dispatch({
      type: types.GET_GLOBALS_REQUEST
    });
    eos.getTableRows(true, 'eosio', 'eosio', 'global').then((results) => dispatch({
      type: types.GET_GLOBALS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_GLOBALS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getGlobals
};

import * as types from './types';

import eos from './helpers/eos';

export function getGlobals() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_GLOBALS_REQUEST
    });
    const { connection } = getState();
    eos(connection).getTableRows(true, 'eosio', 'eosio', 'global').then((results) => dispatch({
      type: types.GET_GLOBALS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_GLOBALS_FAILURE,
      payload: { err },
    }));
  };
}

export function getCurrencyStats() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCYSTATS_REQUEST
    });
    const { connection } = getState();
    eos(connection).getCurrencyStats("eosio.token", "EOS").then((results) => dispatch({
      type: types.GET_CURRENCYSTATS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_CURRENCYSTATS_FAILURE,
      payload: { err },
    }));
  };
}



export default {
  getCurrencyStats,
  getGlobals
};

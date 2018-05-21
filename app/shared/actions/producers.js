import * as types from './types';

const Eos = require('eosjs');

export function getProducers(settings) {
  const eos = Eos.Localnet({ httpEndpoint: settings.node });
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

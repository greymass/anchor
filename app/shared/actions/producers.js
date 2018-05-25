import * as types from './types';

const Eos = require('eosjs');

export function clearProducerCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_PRODUCER_CACHE
    });
  };
}

export function getProducers(settings) {
  const eos = Eos.Localnet({ httpEndpoint: settings.node });
  return (dispatch: () => void) => {
    dispatch({
      type: types.GET_PRODUCERS_REQUEST
    });
    eos.getTableRows({
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'producers',
      limit: 1000
    }).then((results) => dispatch({
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

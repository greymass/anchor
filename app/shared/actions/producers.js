import * as types from './types';

import eos from './helpers/eos';

export function clearProducerCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_PRODUCER_CACHE
    });
  };
}

export function getProducers() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_PRODUCERS_REQUEST
    });
    const { connection } = getState();
    eos(connection).getTableRows({
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

import * as types from './types';
import eos from './helpers/eos';

export function getDelegations() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_DELEGATIONS_REQUEST
    });
    const { connection } = getState();
    // Don't retrieve if we're not on mainnet
    if (connection.chain !== 'eos-mainnet') {
      return dispatch({
        type: types.SYSTEM_DELEGATIONS_FAILURE
      });
    }

    const query = {
      json: true,
      code: 'delegations',
      scope: 'delegations',
      table: 'delegations',
      limit: 1000,
    };

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;

      return dispatch({
        type: types.SYSTEM_DELEGATIONS_SUCCESS,
        payload: {
          delegations: rows
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_DELEGATIONS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getDelegations
};

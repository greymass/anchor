import * as types from './types';
import eos from './helpers/eos';

export function getBidForName(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_NAMEBID_PENDING
    });
    const { connection } = getState();
    // Don't retrieve if we're not on mainnet
    if (connection.chain !== 'eos-mainnet') {
      return dispatch({
        type: types.SYSTEM_NAMEBID_FAILURE
      });
    }

    const query = {
      code: 'eosio',
      json: true,
      limit: 1,
      lower_bound: name,
      scope: 'eosio',
      table: 'namebids'
    };

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;
      const namebid = rows[0];

      return dispatch({
        type: types.SYSTEM_NAMEBID_SUCCESS,
        payload: {
          namebid
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_NAMEBID_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getBidForName
};

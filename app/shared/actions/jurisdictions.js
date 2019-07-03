
import * as types from './types';
import eos from './helpers/eos';

export function getJurisdictions() {
  return (dispatch, getState) => {
    dispatch({
      type: types.GET_JURISDICTION_PENDING
    });
    const { connection, settings } = getState();

    const query = {
      code: 'eosio',
      json: true,
      scope: 'eosio',
      table: 'jurisdiction'
    };

    eos(connection).getTableRows(query).then((results) => {
      console.log('qqqq');
      console.log(results);

      return dispatch({
        type: types.GET_JURISDICTION_SUCCESS,
        payload: {
          jurisdictions: [
            { code: 0, name: 'poland', description: 'EAST EUROPE' },
            { code: 1, name: 'germany', description: 'EAST EUROPE' }
          ]
        }
      });
    }).catch((err) => {
      console.log('error', err);
      dispatch({
        type: types.GET_JURISDICTION_FAILURE,
        payload: err
      });
    });
  };
}

export default {
  getJurisdictions
};

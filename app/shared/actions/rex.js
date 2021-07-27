import eos from './helpers/eos';
import * as types from './types';

function getREXRates() {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.SYSTEM_GETTABLE_REQUEST });
    const { connection } = getState();
    if (!connection.supportedContracts || !connection.supportedContracts.includes('rex')) {
      return false;
    }
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rexpool',
      limit: 10,
      index_position: 1,
      key_type: '',
    };
    eos(connection, false, true).rpc.get_table_rows(query).then(results => dispatch({
      type: types.SYSTEM_GETTABLE_SUCCESS,
      payload: {
        ...results,
        code: 'eosio',
        scope: 'eosio',
        table: 'rexpool',
      }
    })).catch((err) => dispatch({
      type: types.SYSTEM_GETTABLE_FAILURE,
      payload: { err },
    }));
  };
}

function getCPULoans() {
  return (dispatch: () => void, getState) => {
    getLoans('cpuloan', dispatch, getState);
  };
}

function getNETLoans() {
  return (dispatch: () => void, getState) => {
    getLoans('netloan', dispatch, getState);
  };
}

function getLoans(tableName, dispatch, getState) {
  dispatch({ type: types.SYSTEM_GETTABLE_REQUEST });
  const { connection, settings } = getState();
  const query = {
    json: true,
    code: 'eosio',
    scope: 'eosio',
    table: tableName,
    limit: 1000,
    index_position: 3,
    key_type: 'name',
    lower_bound: settings.account,
    upper_bound: settings.account,
  };
  eos(connection, false, true).rpc.get_table_rows(query).then(results => {
    return dispatch({
      type: types.SYSTEM_GETTABLE_SUCCESS,
      payload: {
        ...results,
        code: 'eosio',
        scope: settings.account,
        table: tableName,
      }
    });
  }).catch((err) => dispatch({
    type: types.SYSTEM_GETTABLE_FAILURE,
    payload: { err },
  }));
}

export {
  getCPULoans,
  getNETLoans,
  getREXRates,
};

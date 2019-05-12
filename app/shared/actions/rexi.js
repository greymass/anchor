import eos from './helpers/eos';
import * as types from './types';

export function getCPULoans() {
  return (dispatch: () => void, getState) => {
    getLoans('cpuLoan', 'REXCPULOAN', dispatch, getState);
  };
}

export function getNETLoans() {
  return (dispatch: () => void, getState) => {
    getLoans('netLoan', 'REXNETLOAN', dispatch, getState);
  };
}

function getLoans(tableName, actionName, dispatch, getState) {
  dispatch({ type: types[`GET_${actionName}_REQUEST`] });
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
  eos(connection).getTableRows(query).then(results => {
    return dispatch({
      type: types[`GET_${actionName}_SUCCESS`],
      payload: { results },
    });
  }).catch((err) => {
    return dispatch({
      type: types[`GET_${actionName}FAILURE`],
      payload: { err },
    });
  });
}

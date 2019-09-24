import concat from 'lodash/concat';
import { Api, JsonRpc } from 'eosjs2';

import * as types from './types';
import eos from './helpers/eos';

export function getTable(code, scope, table, limit = 1000, index = false, previous = false) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETTABLE_REQUEST
    });
    const { connection } = getState();
    const query = {
      json: true,
      code,
      scope,
      table,
      limit,
    };
    if (index && previous) {
      if (table === 'infojurisdic') {
        index = 'name';
        query.lower_bound = `${previous[previous.length - 1][index]}`;
        query.table_key = index;
      } else {
        // Adding a space in front of every lower bounds
        //   related: https://github.com/EOSIO/eos/issues/4442
        query.lower_bound = ` ${previous[previous.length - 1][index]}`;
        query.table_key = index;
      }
    }

    if (!connection.httpEndpoint) {
      return;
    }

    const results = await eos(connection).getTableRows(query);
    const { more } = results;
    let { rows } = results;
    // If previous rows were returned
    if (previous) {
      // slice last element to avoid dupes
      previous.pop();
      // merge arrays
      rows = concat(previous, rows);
    }
    const rpc = new JsonRpc('http://eos.greymass.com');
    const api = new Api({ rpc });
    rows = rows.map(async (row) => {
      const original = row;
      if (row.packed_transaction) {
        const data = await api.deserializeTransactionWithActions(row.packed_transaction);
        original.unpacked_transaction = data;
      }
      return original;
    });
    rows = await Promise.all(rows);
    return dispatch({
      type: types.SYSTEM_GETTABLE_SUCCESS,
      payload: {
        code,
        more,
        rows,
        scope,
        table
      }
    });
    // }).catch((err) => dispatch({
    //   type: types.SYSTEM_GETTABLE_FAILURE,
    //   payload: { err },
    // }));
  };
}

export function getTableByBounds(code, scope, table, lower_bound, upper_bound, limit = 1000, index = false, previous = false) {
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETTABLEBYBOUNDS_REQUEST
    });
    const { connection } = getState();
    const query = {
      json: true,
      code,
      scope,
      lower_bound,
      upper_bound,
      table,
      limit,
    };
    if (index && previous) {
      // Adding a space in front of every lower bounds
      //   related: https://github.com/EOSIO/eos/issues/4442
      query.lower_bound = ` ${previous[previous.length - 1][index]}`;
      query.table_key = index;
    }

    if (!connection.httpEndpoint) {
      return;
    }

    const results = await eos(connection).getTableRows(query)
    const { more } = results;
    let { rows } = results;
    // If previous rows were returned
    if (previous) {
      // slice last element to avoid dupes
      previous.pop();
      // merge arrays
      rows = concat(previous, rows);
    }
    const rpc = new JsonRpc('http://eos.greymass.com');
    const api = new Api({ rpc });
    rows = rows.map(async (row) => {
      const original = row;
      if (row.packed_transaction) {
        const data = await api.deserializeTransactionWithActions(row.packed_transaction);
        original.unpacked_transaction = data;
      }
      return original;
    });
    rows = await Promise.all(rows);
    return dispatch({
      type: types.SYSTEM_GETTABLEBYBOUNDS_SUCCESS,
      payload: {
        bounds: lower_bound,
        code,
        more,
        rows,
        scope,
        table
      }
    });
    // }).catch((err) => dispatch({
    //   type: types.SYSTEM_GETTABLE_FAILURE,
    //   payload: { err },
    // }));
  };
}

export function clearTables() {
  return (dispatch: () => void) => {
    dispatch({ type: types.CLEAR_TABLES });
  };
}

export default {
  getTable,
  getTableByBounds,
  clearTables
};

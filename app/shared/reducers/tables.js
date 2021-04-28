import { set } from 'dot-prop-immutable';
import * as types from '../actions/types';

const initialState = {};

export default function tables(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.SYSTEM_BLOCKCHAIN_SWAP:
    case types.CLEAR_TABLES: {
      return initialState;
    }
    case types.SYSTEM_GET_ACCOUNT_SUCCESS: {
      let modified;
      if (action.payload && action.payload.results && action.payload.results.rex_info) {
        const account = action.payload.results.account_name.replace('.', '\\.');
        modified = set(state, `eosio.eosio.rexbal.${account}.rows`, [action.payload.results.rex_info]);
        return modified;
      }
      return state;
    }
    case types.SYSTEM_GETTABLE_SUCCESS: {
      const {
        code,
        more,
        rows,
        scope,
        table,
      } = action.payload;
      const codeEscaped = code.replace('.', '\\.');
      const scopeEscaped = scope.replace('.', '\\.');
      const tableEscaped = table.replace('.', '\\.');
      return set(state, `${codeEscaped}.${scopeEscaped}.${tableEscaped}`, { more, rows });
    }
    case types.SYSTEM_GETTABLEBYBOUNDS_SUCCESS: {
      const {
        bounds,
        code,
        more,
        rows,
        scope,
        table,
      } = action.payload;
      const codeEscaped = code.replace('.', '\\.');
      const scopeEscaped = scope.replace('.', '\\.');
      const tableEscaped = table.replace('.', '\\.');
      const boundsEscaped = bounds.replace('.', '\\.');
      return set(state, `${codeEscaped}.${scopeEscaped}.${tableEscaped}.${boundsEscaped}`, { more, rows });
    }
    default: {
      return state;
    }
  }
}

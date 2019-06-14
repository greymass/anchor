import * as types from '../actions/types';
import { set } from 'dot-prop-immutable';
import { sumBy, uniq } from 'lodash';
import Decimal from 'decimal.js';

const initialState = {
  __lookups: [],
  __map: {},
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.SYSTEM_GETTABLE_SUCCESS: {
      if (action.payload.code === 'eosio' && action.payload.table === 'delband') {
        return set(state, `${action.payload.scope}.delegated`, {
          rows: action.payload.rows,
          total: sumBy(action.payload.rows, (row) => {
            // Skip any staked balances to avoid duplicate data
            if (row.from === row.to) return 0;
            // Skip any incoming staked balances
            if (row.from !== action.payload.scope) return 0;
            // Return sum of both CPU + NET
            const value = parseFloat(Decimal(row.cpu_weight).add(Decimal(row.net_weight)))
            return value;
          }),
        });
      }
      return state;
    }
    case types.GET_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        __updated: Date.now(),
        [action.payload.results.account_name]: action.payload.results
      });
    }
    case types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS: {
      return Object.assign({}, state, {
        __lookups: action.payload.accounts.account_names
      });
    }
    case types.SYSTEM_ACCOUNT_BY_KEYS_SUCCESS: {
      return Object.assign({}, state, {
        __lookups: uniq([
          ...action.payload.accounts.account_names,
          ...state.__lookups,
        ]),
        __map: action.payload.accounts.map
      });
    }
    case types.SYSTEM_ACCOUNT_BY_KEY_PENDING:
    case types.SYSTEM_ACCOUNT_BY_KEY_FAILURE:
    case types.SYSTEM_ACCOUNT_BY_KEY_CLEAR: {
      return Object.assign({}, state, {
        __lookups: []
      });
    }
    default: {
      return state;
    }
  }
}

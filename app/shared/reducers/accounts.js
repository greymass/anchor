import * as types from '../actions/types';
import { get, set } from 'dot-prop-immutable';
import { sumBy, uniq } from 'lodash';
import Decimal from 'decimal.js';

const initialState = {
  // FIO Account Addresses found via key lookup
  __addresses: [],
  // Account names found via key lookup
  __lookups: [],
  // Account Permissions found via key lookup
  __permissions: [],
  // New structure for FIO Address associations
  __results: {},
  // Map of Permissions to Public Keys
  __map: {},
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_GETTABLE_SUCCESS: {
      const account = action.payload.scope.replace(/\./g, '\\.');
      if (
        action.payload.code === 'eosio'
        && action.payload.table === 'delband'
        && get(state, account, false)
      ) {
        return set(state, `${account}.delegated`, {
          rows: action.payload.rows,
          total: sumBy(action.payload.rows, (row) => {
            // Skip any staked balances to avoid duplicate data
            if (row.from === row.to) return 0;
            // Return sum of both CPU + NET
            const cpu = Decimal(row.cpu_weight.split(' ')[0]);
            const net = Decimal(row.net_weight.split(' ')[0]);
            const value = parseFloat(cpu.add(net));
            return value;
          }),
        });
      }
      return state;
    }
    case types.SYSTEM_GET_ACCOUNT_SUCCESS: {
      const account = action.payload.results.account_name.replace(/\./g, '\\.');
      // Retain previous delegated state if it exists
      const delegated = Object.assign({}, {
        rows: [],
        total: 0
      }, get(state, `${account}.delegated`));
      return Object.assign({}, state, {
        __updated: Date.now(),
        [action.payload.results.account_name]: Object.assign({}, { delegated }, action.payload.results)
      });
    }
    case types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS: {
      return Object.assign({}, state, {
        __addresses: action.payload.addresses,
        __lookups: uniq([
          ...action.payload.accounts.account_names,
          ...state.__lookups,
        ]),
        __results: Object.assign({}, state.__results, {
          [action.payload.key]: {
            addresses: action.payload.addresses,
            accounts: action.payload.accounts,
          }
        })
      });
    }
    case types.SYSTEM_ACCOUNT_BY_KEYS_SUCCESS: {
      const names = action.payload.accounts.map(a => a.account_name);
      const perms = action.payload.accounts.map(a => `${a.account_name}@${a.permission_name}`);
      const map = {};
      action.payload.accounts.forEach(a => {
        if (!map[a.authorizing_key]) {
          map[a.authorizing_key] = [];
        }
        map[a.authorizing_key].push(`${a.account_name}@${a.permission_name}`);
      });
      return Object.assign({}, state, {
        __lookups: uniq([
          ...names,
          ...state.__lookups,
        ]),
        __permissions: perms,
        __map: map
      });
    }
    case types.SYSTEM_ACCOUNT_BY_KEY_PENDING:
    // case types.SYSTEM_ACCOUNT_BY_KEY_FAILURE:
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

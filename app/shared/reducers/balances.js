import * as types from '../actions/types';
import { get, set } from 'dot-prop-immutable';
import { map, reduce } from 'lodash';

const initialState = {
  __contracts: {
    EOS: 'eosio.token'
  }
};

export default function balances(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.CLEAR_BALANCE_CACHE:
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.GET_ACCOUNT_BALANCES_SUCCESS: {
      let modified;
      const newBalances = Object.assign({}, state[action.payload.account], action.payload.tokens);
      const newPrecisions = Object.assign({}, state.__contracts, reduce(
        action.payload.results,
        (res, { code, symbol }) => ({
          ...res,
          ...{
            [symbol.toUpperCase()]: {
              contract: code,
              precision: {
                [symbol]: get(action, `payload.precisions.${symbol}`, 4)
              }
            }
          }
        }), {}
      ));
      const account = action.payload.account.replace('.', '\\.');
      modified = set(state, account, newBalances);
      modified = set(modified, '__contracts', newPrecisions);
      return modified;
    }
    case types.GET_ACCOUNT_BALANCE_SUCCESS: {
      const {
        account_name,
        contract,
        precision,
        symbol,
        tokens
      } = action.payload;
      return Object.assign({}, state, {
        __contracts: Object.assign({}, state.__contracts, {
          [symbol.toUpperCase()]: {
            contract,
            precision
          }
        }),
        [account_name]: Object.assign({}, state[account_name], tokens)
      });
    }
    default: {
      return state;
    }
  }
}

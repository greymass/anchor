import { get } from 'dot-prop-immutable';
import { isEqual } from 'lodash';

import * as types from '../actions/types';

const initialState = {
  current: {},
  contract: {},
  pricefeed: {},
};

export default function globals(state = initialState, action) {
  switch (action.type) {
    case types.VALIDATE_NODE_SUCCESS:
    case types.RESET_ALL_STATES: {
      // Prevent reset if this was just a validation call
      if (action.payload && !action.payload.useImmediately) {
        return state;
      }
      return Object.assign({}, initialState);
    }
    // SYSTEM_GET_GLOBALS_REQUEST
    // SYSTEM_GET_GLOBALS_SUCCESS
    // SYSTEM_GET_GLOBALS_FAILURE
    case types.SYSTEM_GET_GLOBALS_SUCCESS: {
      return Object.assign({}, state, {
        __updated: Date.now(),
        current: action.payload.results.rows[0]
      });
    }
    // GET_CURRENCYSTATS_REQUEST
    // GET_CURRENCYSTATS_SUCCESS
    // GET_CURRENCYSTATS_FAILURE
    case types.GET_CURRENCYSTATS_FAILURE: {
      return Object.assign({}, state, {
        contract: Object.assign({}, state.contract, {
          [action.payload.account]: Object.assign({}, state.contract[action.payload.account], {
            [action.payload.symbol]: {
              status: 'not-found'
            }
          })
        })
      });
    }
    case types.SYSTEM_PRICEFEEDUSD_SUCCESS: {
      const pricefeed = {
        [action.payload.scope]: get(action, 'payload.results.rows.0.median')
      };
      if (isEqual(state.pricefeed, pricefeed)) {
        return state;
      }
      return Object.assign({}, state, { pricefeed });
    }
    case types.GET_CURRENCYSTATS_SUCCESS: {
      return Object.assign({}, state, {
        contract: Object.assign({}, state.contract, {
          [action.payload.account]: Object.assign({}, state.contract[action.payload.account], {
            [action.payload.symbol]: action.payload.results[action.payload.symbol]
          })
        })
      });
    }
    case types.GET_RAMSTATS_FAILURE: {
      return Object.assign({}, state, {
        ram: Object.assign({}, state.ram, {
          base_balance: null,
          quote_balance: null
        })
      });
    }
    case types.GET_RAMSTATS_SUCCESS: {
      return Object.assign({}, state, {
        ram: Object.assign({}, state.contract, {
          updated: Date.now(),
          base_balance: action.payload.base_balance,
          quote_balance: action.payload.quote_balance
        })
      });
    }
    default: {
      return state;
    }
  }
}

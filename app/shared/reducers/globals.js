import * as types from '../actions/types';

const initialState = {
  current: {},
  contract: {}
};

export default function globals(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    // GET_GLOBALS_REQUEST
    // GET_GLOBALS_SUCCESS
    // GET_GLOBALS_FAILURE
    case types.GET_GLOBALS_SUCCESS: {
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

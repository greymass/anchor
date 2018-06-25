import * as types from '../actions/types';

const initialState = {
  lastError: {},
  lastTransaction: {},
  list: [],
  updated: null
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.CLEAR_TRANSACTIONS_CACHE: {
      return Object.assign({}, state, {
        list: []
      });
    }
    case types.GET_TRANSACTIONS_FAILURE: {
      return Object.assign({}, state, {
        list: []
      });
    }
    case types.GET_TRANSACTIONS_SUCCESS: {
      return Object.assign({}, state, {
        __updated: Date.now(),
        list: action.payload.list
      });
    }
    case types.GET_TRANSACTIONS_REQUEST:
    default: {
      return state;
    }
  }
}

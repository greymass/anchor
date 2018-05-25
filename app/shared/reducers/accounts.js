import * as types from '../actions/types';

export default function accounts(state = {}, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.RESET_ALL_STATES: {
      return {};
    }
    case types.GET_ACCOUNT_FAILURE: {
      return Object.assign({}, state, {
        [action.payload.account_name]: 'failed'
      });
    }
    case types.GET_ACCOUNT_REQUEST: {
      return Object.assign({}, state, {
        [action.payload.account_name]: 'pending'
      });
    }
    case types.GET_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        [action.payload.results.account_name]: action.payload.results
      });
    }
    default: {
      return state;
    }
  }
}

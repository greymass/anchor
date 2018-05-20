import * as types from '../actions/types';

export default function accounts(state = {}, action) {
  switch (action.type) {
    // GET_ACCOUNT_REQUEST
    // GET_ACCOUNT_SUCCESS
    // GET_ACCOUNT_FAILURE
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

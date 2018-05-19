import * as types from '../actions/types';

export default function accounts(state = {}, action) {
  switch (action.type) {
    // GET_ACCOUNT_REQUEST
    // GET_ACCOUNT_SUCCESS
    // GET_ACCOUNT_FAILURE
    case types.GET_ACCOUNT_SUCCESS: {
      console.log(action.payload)
      return Object.assign({}, state, { list: action.payload.results.rows });
    }
    default: {
      return state;
    }
  }
}

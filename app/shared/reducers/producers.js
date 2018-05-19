import * as types from '../actions/types';

const initialState = {
  list: []
};

export default function producers(state = initialState, action) {
  switch (action.type) {
    // GET_PRODUCERS_REQUEST
    // GET_PRODUCERS_FAILURE
    // GET_PRODUCERS_SUCCESS
    case types.GET_PRODUCERS_SUCCESS: {
      return Object.assign({}, state, { list: action.payload.results.rows });
    }
    default: {
      return state;
    }
  }
}

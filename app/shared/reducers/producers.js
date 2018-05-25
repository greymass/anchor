import * as types from '../actions/types';

const initialState = {
  list: []
};

export default function producers(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.CLEAR_PRODUCER_CACHE: {
      return Object.assign({}, state, {
        list: []
      });
    }
    case types.GET_PRODUCERS_FAILURE: {
      return Object.assign({}, state, {
        list: []
      });
    }
    case types.GET_PRODUCERS_SUCCESS: {
      return Object.assign({}, state, {
        list: action.payload.results.rows
      });
    }
    case types.GET_PRODUCERS_REQUEST:
    default: {
      return state;
    }
  }
}

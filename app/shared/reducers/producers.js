import * as types from '../actions/types';

const initialState = {
  lastError: {},
  lastTransaction: {},
  list: [],
  selected: [],
  updated: null
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
        __updated: Date.now(),
        list: action.payload.list
      });
    }
    case types.GET_ACCOUNT_SUCCESS: {
      const account = action.payload.results;
      if (account && account.voter_info) {
        const selected = account.voter_info.producers;
        if (!state.selected || selected.sort().toString() !== state.selected.sort().toString()) {
          return Object.assign({}, state, {
            selected
          });
        }
      }
      return state;
    }
    case types.GET_PRODUCERS_REQUEST:
    default: {
      return state;
    }
  }
}

function parseError(err) {
  try {
    return JSON.parse(err);
  } catch (e) {
    return err;
  }
}

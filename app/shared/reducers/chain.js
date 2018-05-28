import * as types from '../actions/types';

const initialState = {};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.GET_CHAIN_INFO_SUCCESS: {
      return Object.assign({}, state, action.payload.chain);
    }
    default: {
      return state;
    }
  }
}

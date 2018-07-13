import * as types from '../actions/types';

const initialState = {};

export default function blockexplorers(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_BLOCKEXPLORERS_SUCCESS: {
      return Object.assign({}, state, action.payload.blockExplorers);
    }
    default: {
      return state;
    }
  }
}

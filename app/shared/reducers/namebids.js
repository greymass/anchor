import * as types from '../actions/types';

const initialState = {
  namebids: []
};

export default function namebids(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_NAMEBIDS_SUCCESS: {
      return Object.assign({}, state, {
        namebids: action.payload.namebids
      });
    }
    default: {
      return state;
    }
  }
}

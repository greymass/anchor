import * as types from '../actions/types';

const initialState = {
  tokens: [],
};

export default function customtokens(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_CUSTOMTOKENS_SUCCESS: {
      return Object.assign({}, state, {
        tokens: action.payload.tokens
      });
    }
    default: {
      return state;
    }
  }
}

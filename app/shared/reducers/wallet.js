import * as types from '../actions/types';

const initialState = {
  key: ''
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SET_WALLET_KEY: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
}

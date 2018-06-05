import * as types from '../actions/types';

const initialState = {
  data: false
};

export default function wallet(state = initialState, action) {
  switch (action.type) {
    case types.WALLET_REMOVE:
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SET_WALLET_KEY: {
      return Object.assign({}, state, {
        account: action.payload.account,
        data: action.payload.data,
        version: 1
      });
    }
    default: {
      return state;
    }
  }
}

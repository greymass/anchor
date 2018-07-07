import * as types from '../actions/types';

const initialState = {
  account: false,
  key: '',
  temporary: false
};

export default function keys(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES:
    case types.WALLET_LOCK:
    case types.WALLET_REMOVE: {
      return Object.assign({}, initialState);
    }
    case types.SET_WALLET_KEYS_TEMPORARY: {
      return Object.assign({}, state, {
        account: action.payload.account,
        key: action.payload.key,
        temporary: true
      });
    }
    case types.SET_WALLET_KEYS_ACTIVE: {
      return Object.assign({}, state, {
        account: action.payload.account,
        key: action.payload.key,
        temporary: false
      });
    }
    default: {
      return state;
    }
  }
}

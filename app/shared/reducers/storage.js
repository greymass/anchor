import * as types from '../actions/types';

const initialState = {
  // data storage
  data: null,
  // all usable keys
  keys: [],
  // a mapping of public key -> path for hardware devices
  paths: {},
};

export default function storage(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.WALLET_STORAGE_UPDATE: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
}

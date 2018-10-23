import * as types from '../actions/types';

const initialState = {
  account: false,
  hash: '',
  key: '',
  temporary: false
};

export default function keys(state = initialState, action) {
  switch (action.type) {
    case types.PREPARE_WALLET_CONVERT_LEDGER_COMPLETE:
    case types.RESET_ALL_STATES:
    case types.WALLET_LOCK:
    case types.WALLET_REMOVE: {
      return Object.assign({}, initialState);
    }
    case types.SET_CURRENT_KEY_TEMPORARY: {
      return Object.assign({}, state, {
        account: action.payload.account,
        hash: action.payload.hash,
        key: action.payload.key,
        pubkey: action.payload.pubkey,
        temporary: true
      });
    }
    case types.SET_CURRENT_KEY: {
      return Object.assign({}, state, {
        account: action.payload.account,
        hash: action.payload.hash,
        key: action.payload.key,
        pubkey: action.payload.pubkey,
        temporary: false
      });
    }
    default: {
      return state;
    }
  }
}

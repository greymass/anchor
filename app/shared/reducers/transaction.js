import * as types from '../actions/types';

const initialState = {
  data: false,
  signed: false
};

export default function keys(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_TRANSACTION:
    case types.RESET_ALL_STATES:
    case types.RESET_SYSTEM_STATES:
    case types.WALLET_LOCK:
    case types.WALLET_REMOVE: {
      return Object.assign({}, initialState);
    }
    case types.SET_TRANSACTION: {
      return Object.assign({}, state, {
        data: action.payload.transaction,
        signed: (action.payload.transaction.transaction.signatures.length > 0)
      });
    }
    default: {
      return state;
    }
  }
}

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
    case types.PREPARE_WALLET_CONVERT_LEDGER: {
      if (
        action.payload.account === state.account
        && action.payload.authorization === state.authorization
      ) {
        return Object.assign({}, state, {
          convertParameters: action.payload
        });
      }
      return state;
    }
    case types.PREPARE_WALLET_CONVERT_LEDGER_COMPLETE: {
      if (
        action.payload.account === state.account
        && action.payload.authorization === state.authorization
      ) {
        return Object.assign({}, state, {
          convertParameters: undefined,
          data: undefined,
          mode: 'ledger'
        });
      }
      return state;
    }
    case types.PREPARE_WALLET_CONVERT_LEDGER_ABORT: {
      if (
        action.payload.account === state.account
        && action.payload.authorization === state.authorization
      ) {
        return Object.assign({}, state, {
          convertParameters: undefined
        });
      }
      return state;
    }
    case types.SET_CURRENT_WALLET: {
      return Object.assign({}, state, {
        account: action.payload.account,
        accountData: action.payload.accountData,
        authorization: action.payload.authorization,
        convertParameters: action.payload.convertParameters,
        data: action.payload.data,
        mode: action.payload.mode,
        path: action.payload.path,
        pubkey: action.payload.pubkey
      });
    }
    default: {
      return state;
    }
  }
}

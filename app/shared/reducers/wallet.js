import * as types from '../actions/types';

const initialState = {};

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
        && action.payload.chainId === state.chainId
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
        && action.payload.chainId === state.chainId
      ) {
        return Object.assign({}, state, {
          convertParameters: undefined,
          data: undefined,
          mode: 'ledger',
          path: action.payload.path,
          pubkey: action.payload.pubkey
        });
      }
      return state;
    }
    case types.PREPARE_WALLET_CONVERT_LEDGER_ABORT: {
      if (
        action.payload.account === state.account
        && action.payload.authorization === state.authorization
        && action.payload.chainId === state.chainId
      ) {
        return Object.assign({}, state, {
          convertParameters: undefined
        });
      }
      return state;
    }
    case types.SET_CURRENT_WALLET: {
      const newState = {
        account: action.payload.account,
        accountData: action.payload.accountData,
        address: action.payload.address,
        authorization: action.payload.authorization,
        chainId: action.payload.chainId || false,
        convertParameters: action.payload.convertParameters,
        data: action.payload.data,
        mode: action.payload.mode,
        path: action.payload.path,
        pubkey: action.payload.pubkey
      };
      return Object.assign({}, state, newState);
    }
    case types.SET_CURRENT_WALLET_ADDRESS: {
      return Object.assign({}, state, {
        address: action.payload.address
      });
    }
    default: {
      return state;
    }
  }
}

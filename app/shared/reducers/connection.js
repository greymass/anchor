import * as types from '../actions/types';

const initialState = {
  expireInSeconds: 60
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    // Update httpEndpoint based on node validation/change
    case types.VALIDATE_NODE_SUCCESS: {
      return Object.assign({}, state, {
        httpEndpoint: action.payload.node
      });
    }
    // Remove key from connection if the wallet is locked/removed
    case types.WALLET_LOCK:
    case types.WALLET_REMOVE: {
      return Object.assign({}, state, {
        keyProvider: []
      });
    }
    // Add key to connection if wallet is set or unlocked
    case types.SET_TEMPORARY_KEY:
    case types.SET_WALLET_KEY:
    case types.VALIDATE_WALLET_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        keyProvider: action.payload.key,
      });
    }
    // Update chainId on successful chain info request
    case types.GET_CHAIN_INFO_SUCCESS: {
      return Object.assign({}, state, {
        chainId: action.payload.chain.chain_id
      });
    }
    default: {
      return state;
    }
  }
}

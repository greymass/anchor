import * as types from '../actions/types';

const initialState = {
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  broadcast: true,
  expireInSeconds: 120,
  forceActionDataHex: false,
  httpEndpoint: null
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case types.WALLET_REMOVE:
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
    case types.WALLET_LOCK: {
      return Object.assign({}, state, {
        keyProvider: []
      });
    }
    // Cold Wallet: increase expiration to 1hr, disable broadcast, enable sign
    case types.SET_WALLET_COLD: {
      return Object.assign({}, state, {
        broadcast: false,
        expireInSeconds: 3600,
        forceActionDataHex: false,
        sign: true
      });
    }
    // Watch Wallet: increase expiration to 1hr, enable broadcast, disable sign
    case types.SET_WALLET_WATCH: {
      return Object.assign({}, state, {
        broadcast: false,
        expireInSeconds: 3600,
        forceActionDataHex: false,
        sign: false
      });
    }
    // Hot Wallet: set expire to 2 minutes, enable broadcast, enable sign
    case types.SET_WALLET_HOT: {
      return Object.assign({}, state, {
        broadcast: true,
        expireInSeconds: 120,
        forceActionDataHex: true,
        sign: true
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

import * as types from '../actions/types';

const initialState = {
  expireInSeconds: 60
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.VALIDATE_NODE_SUCCESS: {
      return Object.assign({}, state, {
        httpEndpoint: action.payload.node
      });
    }
    case types.SET_TEMPORARY_KEY:
    case types.SET_WALLET_KEY:
    case types.VALIDATE_WALLET_PASSWORD_SUCCESS: {
      return Object.assign({}, state, {
        keyProvider: action.payload.key,
      });
    }
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

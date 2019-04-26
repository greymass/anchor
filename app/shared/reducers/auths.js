import { get, set } from 'dot-prop-immutable';
import { partition } from 'lodash';
import * as types from '../actions/types';

const initialState = {
  keystore: [],
};

export default function auths(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES:
    case types.WALLET_LOCK: {
      return Object.assign({}, initialState);
    }
    case types.SET_AUTH:
    case types.SET_CURRENT_KEY: {
      const partitionQuery = {
        pubkey: action.payload.pubkey
      };
      const [, other] = partition(state.keystore, partitionQuery);
      return Object.assign({}, state, {
        keystore: [
          {
            hash: action.payload.hash,
            key: action.payload.key,
            pubkey: action.payload.pubkey,
          },
          ...other
        ]
      });
    }
    default: {
      return state;
    }
  }
}

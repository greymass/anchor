import { partition } from 'lodash';
import * as types from '../actions/types';

const initialState = [];

export default function auths(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES:
    case types.WALLET_LOCK: {
      return [...initialState];
    }
    case types.SET_AUTH:
    case types.SET_CURRENT_KEY: {
      const partitionQuery = {
        pubkey: action.payload.pubkey
      };
      const [, other] = partition(state, partitionQuery);
      return [
        {
          hash: action.payload.hash,
          key: action.payload.key,
          pubkey: action.payload.pubkey,
        },
        ...other
      ];
    }
    default: {
      return state;
    }
  }
}

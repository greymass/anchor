import { partition } from 'lodash';

import * as types from '../actions/types';

const initialState = [];

export default function wallets(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return [...initialState];
    }
    case types.SET_WALLET_ACTIVE:
    case types.IMPORT_WALLET_KEY: {
      const [, other] = partition(state, { account: action.payload.account });
      return [
        action.payload,
        ...other
      ];
    }
    case types.REMOVE_WALLET: {
      const [, other] = partition(state, { account: action.payload.account });
      return other;
    }
    default: {
      return state;
    }
  }
}

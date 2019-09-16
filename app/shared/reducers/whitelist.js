import { set } from 'dot-prop-immutable';
import * as types from '../actions/types';
import { partition } from 'lodash';

const initialState = [];

export default function whitelist(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.SYSTEM_WHITELIST_ADD: {
      const {
        blockchain,
        entry,
        wallet,
      } = action.payload;
      const auth = [
        wallet.account,
        wallet.authorization,
      ].join('@');
      const [, other] = partition(state, {
        auth,
        chainId: blockchain.chainId,
        contract: entry.actions[0].account,
        method: entry.actions[0].name,
      });
      return [
        {
          auth,
          actions: entry.actions,
          chainId: blockchain.chainId,
          contract: entry.actions[0].account,
          flexible: entry.flexible,
          method: entry.actions[0].name,
        },
        ...other,
      ];
    }
    default: {
      return state;
    }
  }
}

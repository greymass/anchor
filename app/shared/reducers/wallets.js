import { partition } from 'lodash';

import * as types from '../actions/types';

const initialState = [];

export default function wallets(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return [...initialState];
    }
    case types.SET_CURRENT_WALLET:
    case types.IMPORT_WALLET_KEY: {
      const [, other] = partition(state, {
        account: action.payload.account,
        authorization: action.payload.authorization
      });
      return [
        action.payload,
        ...other
      ];
    }
    case types.PREPARE_WALLET_CONVERT_LEDGER: {
      const [toModify, others] = partition(state, {
        account: action.payload.account,
        authorization: action.payload.authorization
      });
      // If the wallet is found
      if (toModify.length) {
        // Add the conversion parameters to the wallet
        const modified = Object.assign({}, toModify[0], {
          convertParameters: action.payload
        });
        // Store the modified wallet
        return [
          modified,
          ...others
        ];
      }
      // If no match found, return unmodified state
      return state;
    }
    case types.PREPARE_WALLET_CONVERT_LEDGER_COMPLETE: {
      const [toModify, others] = partition(state, {
        account: action.payload.account,
        authorization: action.payload.authorization
      });
      // If the wallet is found
      if (toModify.length) {
        // Add the conversion parameters to the wallet
        const modified = Object.assign({}, toModify[0], {
          convertParameters: undefined,
          data: undefined,
          mode: 'ledger'
        });
        // Store the modified wallet
        return [
          modified,
          ...others
        ];
      }
      // If no match found, return unmodified state
      return state;
    }
    case types.PREPARE_WALLET_CONVERT_LEDGER_ABORT: {
      const [toModify, others] = partition(state, {
        account: action.payload.account,
        authorization: action.payload.authorization
      });
      // If the wallet is found
      if (toModify.length) {
        // Add the conversion parameters to the wallet
        const modified = Object.assign({}, toModify[0], {
          convertParameters: undefined
        });
        // Store the modified wallet
        return [
          modified,
          ...others
        ];
      }
      // If no match found, return unmodified state
      return state;
    }
    case types.REMOVE_WALLET: {
      const [, other] = partition(state, {
        account: action.payload.account,
        authorization: action.payload.authorization
      });
      return other;
    }
    case types.UPGRADE_WALLET: {
      const [current, other] = partition(state, {
        account: action.payload.account,
        authorization: action.payload.oldAuthorization
      });
      if (current.length > 0) {
        const modified = Object.assign({}, current[0]);
        modified.accountData = action.payload.accountData;
        modified.authorization = action.payload.authorization;
        modified.pubkey = action.payload.pubkey;
        return [
          ...[modified],
          ...other
        ];
      }
      return [
        ...current,
        ...other
      ];
    }
    default: {
      return state;
    }
  }
}

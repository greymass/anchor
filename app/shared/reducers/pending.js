import { partition } from 'lodash';

import * as types from '../actions/types';

const initialState = {
  accounts: [],
  certificates: [],
  request: false,
};

export default function pending(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.SYSTEM_ESRURI_RESET: {
      return Object.assign({}, state, {
        request: false
      });
    }
    case types.SYSTEM_ESRURI_SUCCESS: {
      return Object.assign({}, state, {
        request: action.payload
      });
    }
    case types.SYSTEM_PENDING_ACCOUNT_CERTIFICATE_CREATE: {
      const [, other] = partition(state.certificates, {
        account: action.payload.account,
        chainId: action.payload.chainId,
      });
      return Object.assign({}, state, {
        certificates: [
          action.payload,
          ...other
        ]
      });
    }
    case types.SYSTEM_PENDING_ACCOUNT_CERTIFICATE_REMOVE: {
      const [, other] = partition(state.certificates, {
        account: action.payload.account,
        chainId: action.payload.chainId,
      });
      return Object.assign({}, state, {
        certificates: [
          ...other
        ]
      });
    }
    case types.SYSTEM_PENDING_ACCOUNT_CREATE: {
      const [, other] = partition(state.accounts, {
        account: action.payload.account,
        chainId: action.payload.chainId,
      });
      return Object.assign({}, state, {
        accounts: [
          action.payload,
          ...other
        ]
      });
    }
    case types.SYSTEM_PENDING_ACCOUNT_REMOVE:
    case types.IMPORT_WALLET_KEY: {
      const [, other] = partition(state.accounts, {
        account: action.payload.account,
        permission: action.payload.permission || action.payload.authorization,
        chainId: action.payload.chainId,
      });
      return Object.assign({}, state, {
        accounts: [
          ...other
        ]
      });
    }
    case types.SYSTEM_PENDING_DATA_RESTORE: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
}

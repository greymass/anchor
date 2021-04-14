import { get } from 'dot-prop-immutable';

import * as types from '../actions/types';

const initialState = {
  contract: false,
  data: false,
  signed: false
};

export default function transaction(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_TRANSACTION:
    case types.RESET_ALL_STATES:
    case types.RESET_SYSTEM_STATES:
    case types.SYSTEM_TRANSACTION_BUILD_PENDING:
    case types.WALLET_LOCK:
    case types.WALLET_REMOVE: {
      return Object.assign({}, initialState);
    }
    case types.SET_TRANSACTION: {
      const firstAuth = get(action.payload, 'transaction.transaction.transaction.actions.0.authorization.0', {
        actor: 'undefined',
        permission: 'undefined',
      });
      const requiredSignatures = (String(firstAuth === 'greymassfuel')) ? 2 : 1;
      return Object.assign({}, state, {
        contracts: action.payload.contracts,
        data: action.payload.transaction,
        decoded: action.payload.decoded,
        signed: !!(
          action.payload.transaction.transaction
          && action.payload.transaction
          && action.payload.transaction.transaction.signatures
          && action.payload.transaction.transaction.signatures.length > requiredSignatures - 1
        )
      });
    }
    case types.SET_TRANSACTION_FAILURE: {
      return Object.assign({}, state, {
        error: action.payload.err
      });
    }
    default: {
      return state;
    }
  }
}

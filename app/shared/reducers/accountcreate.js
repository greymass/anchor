import * as types from '../actions/types';

const initialState = {};

export default function accountcreate(state = initialState, action) {
  switch (action.type) {
    case types.ACCOUNT_CREATION_RESET:
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.ACCOUNT_CREATION_CODE: {
      return Object.assign({}, state, {
        ...action.payload,
        error: undefined,
      });
    }
    case types.ACCOUNT_CREATION_CODE_REDEEMED: {
      return Object.assign({}, state, {
        transactionId: action.payload
      });
    }
    case types.ACCOUNT_CREATION_CODE_USED: {
      return Object.assign({}, state, action.payload);
    }
    case types.ACCOUNT_CREATION_NEW_ACCOUNT_RECEIVED: {
      return Object.assign({}, state, {
        account: action.payload
      });
    }
    case types.ACCOUNT_CREATION_CERT_BACKUP_COMPLETE:
    case types.ACCOUNT_CREATION_CERT_RECEIVE_CANCELLED: {
      return Object.assign({}, state, {
        cancelled: Date.now(),
        words: undefined
      });
    }
    case types.ACCOUNT_CREATION_CERT_WORDS_RECEIVED: {
      return Object.assign({}, state, {
        saved: Date.now(),
        words: action.payload
      });
    }
    case types.ACCOUNT_CREATION_VERIFY_ACCOUNT: {
      let transactionEta = false;
      let transactionIrreversible = false;
      if (action.payload.status === 200) {
        const irreversibleTime = new Date(`${action.payload.created}z`);
        irreversibleTime.setSeconds(irreversibleTime.getSeconds() + 60);
        const now = Date.now();
        const diff = (now - irreversibleTime) / 1000;
        const irreversible = diff > 0;
        transactionEta = Math.max(0, diff * -1);
        transactionIrreversible = !!irreversible;
      }
      return Object.assign({}, state, {
        transactionEta,
        transactionExists: (action.payload.status === 200),
        transactionIrreversible,
      });
    }
    case types.ACCOUNT_CREATION_VERIFY_TRANSACTION: {
      const transactionEta = (action.payload.status === 200)
        ? Math.max(0, (action.payload.block_num - action.payload.last_irreversible_block) / 2)
        : false;
      return Object.assign({}, state, {
        transactionEta,
        transactionExists: (action.payload.status === 200),
        transactionIrreversible: action.payload.irreversible,
      });
    }
    default: {
      return state;
    }
  }
}

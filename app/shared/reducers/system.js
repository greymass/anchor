import { delete as del, get, set } from 'dot-prop-immutable';
import * as types from '../actions/types';

import EOSContract from '../utils/EOS/Contract';

export default function system(state = {}, action) {
  const { type } = action;

  if (
    action.type === types.RESET_ALL_STATES
    || action.type === types.RESET_SYSTEM_STATES
  ) {
    return {};
  }

  if (
    action.type === types.SYSTEM_ESRURI_RESET
  ) {
    return Object.assign({}, state, {
      ESRURIBUILD: false,
      ESRURIBUILD_LAST_TRANSACTION: false,
      ESRURIBUILD_LAST_ERROR: false,
      ESRURIBROADCAST: false,
      ESRURICALLBACK: false,
      ESRURICALLBACK_LAST_ERROR: false,
      ESRURISIGN: false,
      ESRURISIGN_LAST_ERROR: false,
    });
  }

  const matches = /^SYSTEM_(.*)_(PENDING|PROGRESS|SUCCESS|FAILURE|WARNING)$/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  const accountField = `${requestName}_LAST_ACCOUNT`;
  const contractField = `${requestName}_LAST_CONTRACT`;
  const dataField = `${requestName}_DATA`;
  const errField = `${requestName}_LAST_ERROR`;
  const nameBidField = `${requestName}_LAST_BID`;
  const progressField = `${requestName}_PROGRESS`;
  const warningField = `${requestName}_LAST_WARNING`;
  const txField = `${requestName}_LAST_TRANSACTION`;
  const awaitingDeviceField = `${requestName}_AWAITING_DEVICE`;

  const contractHashField = `${requestName}_LAST_CONTRACT_HASH`;

  let newState = Object.assign({}, state, {
    [requestName]: requestState,
    errField: undefined,
    txField: undefined
  });

  if (action.payload) {
    // Attach the account name associated to request when given
    if (action.payload.account_name) {
      newState = set(newState, accountField, action.payload.account_name);
    }
    // Attach the namebid associated to request when given
    if (action.payload.namebid) {
      newState = set(newState, nameBidField, action.payload.namebid);
    }
    // Attempt to process any errors returned
    if (action.payload.err) {
      try {
        newState = set(newState, errField, JSON.parse(action.payload.err));
      } catch (e) {
        newState = set(newState, errField, action.payload.err);
      }
    }

    if (action.payload.warning) {
      try {
        newState = set(newState, warningField, JSON.parse(action.payload.warning));
      } catch (e) {
        newState = set(newState, warningField, action.payload.warning);
      }
    }
    if (action.payload.connection) {
      const { connection } = action.payload;
      if (connection.signMethod === 'ledger') {
        newState = set(newState, awaitingDeviceField, (requestState === 'PENDING'));
      }
    }
    // Attach any returned data
    if (action.payload.data) {
      newState = set(newState, dataField, action.payload.data);
    }
    // Attach any returned transactions
    if (action.payload.tx) {
      if (action.payload.tx.transaction && action.payload.tx.contract) {
        const { abi, contract } = action.payload.tx.contract;
        newState = set(newState, contractField, new EOSContract(abi, contract));
        newState = set(newState, txField, action.payload.tx.transaction);
      } else {
        newState = set(newState, txField, action.payload.tx);
      }
    }
    // Attach any returned ABIs
    if (action.payload.contract && action.payload.contract.abi && action.payload.contract.account_name) {
      const { abi, account_name } = action.payload.contract;
      newState = set(newState, contractField, new EOSContract(abi, account_name));
    }

    if (action.payload.contract_hash) {
      newState = set(newState, contractHashField, action.payload.contract_hash);
    } else if (requestName === 'ACCOUNT_HAS_CONTRACT') {
      newState = set(newState, contractHashField, null);
    }
  }

  if (requestState === 'PENDING' && action.payload && action.payload.total) {
    newState = set(newState, progressField, {
      completed: 0,
      total: action.payload.total,
    });
  }

  if (requestState === 'PROGRESS' && state[progressField]) {
    newState = set(newState, progressField, {
      completed: state[progressField].completed + 1,
      total: state[progressField].total,
    });
  }


  if (requestState === 'SUCCESS' || requestState === 'PENDING') {
    newState = del(newState, errField);
  }

  if (requestState === 'FAILURE') {
    newState = del(newState, txField);
    newState = set(newState, 'latestFailure', {
      requestName,
      type
    });
  }

  if (action.type === types.SYSTEM_ESRURIBUILD_PENDING) {
    newState = del(newState, 'ESRURIBROADCAST_LAST_ERROR');
    newState = del(newState, 'ESRURIBUILD_LAST_ERROR');
    newState = del(newState, 'ESRURICALLBACK_LAST_ERROR');
    newState = del(newState, 'ESRURISIGN_LAST_ERROR');
  }

  return newState;
}

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
    action.type === types.SYSTEM_EOSIOURI_RESET
  ) {
    return Object.assign({}, state, {
      EOSIOURIBUILD: false,
      EOSIOURIBUILD_LAST_TRANSACTION: false,
      EOSIOURIBUILD_LAST_ERROR: false,
      EOSIOURIBROADCAST: false,
      EOSIOURICALLBACK: false,
      EOSIOURISIGN: false,
      EOSIOURISIGN_LAST_ERROR: false,
    });
  }

  const matches = /^SYSTEM_(.*)_(PENDING|PROGRESS|SUCCESS|FAILURE|WARNING)$/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  const accountField = `${requestName}_LAST_ACCOUNT`;
  const contractField = `${requestName}_LAST_CONTRACT`;
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
    // Attach any returned transactions
    if (action.payload.tx) {
      newState = set(newState, txField, action.payload.tx);
    }
    // Attach any returned ABIs
    if (action.payload.contract) {
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
  }

  if (action.type === types.SYSTEM_EOSIOURIBUILD_PENDING) {
    newState = del(newState, 'EOSIOURIBROADCAST_LAST_ERROR');
    newState = del(newState, 'EOSIOURIBUILD_LAST_ERROR');
    newState = del(newState, 'EOSIOURISIGN_LAST_ERROR');
  }

  return newState;
}

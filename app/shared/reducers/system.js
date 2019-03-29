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

  if (action.type === types.SYSTEM_EOSIOURI_RESET) {
    return Object.assign({}, state, {
      EOSIOURISIGN: false,
      EOSIOURICALLBACK: false,
      EOSIOURIBUILD: false,
      EOSIOURIBROADCAST: false,
      EOSIOURIBUILD_LAST_TRANSACTION: false,
    });
  }

  const matches = /^SYSTEM_(.*)_(PENDING|SUCCESS|FAILURE)$/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  const accountField = `${requestName}_LAST_ACCOUNT`;
  const nameBidField = `${requestName}_LAST_BID`;
  const contractField = `${requestName}_LAST_CONTRACT`;
  const errField = `${requestName}_LAST_ERROR`;
  const txField = `${requestName}_LAST_TRANSACTION`;
  const awaitingDeviceField = `${requestName}_AWAITING_DEVICE`;

  const contractHashField = `${requestName}_LAST_CONTRACT_HASH`;

  const newState = {
    ...state,
    [requestName]: requestState,
    errField: undefined,
    txField: undefined
  };

  if (action.payload) {
    // Attach the account name associated to request when given
    if (action.payload.account_name) {
      newState[accountField] = action.payload.account_name;
    }
    // Attach the namebid associated to request when given
    if (action.payload.namebid) {
      newState[nameBidField] = action.payload.namebid;
    }
    // Attempt to process any errors returned
    if (action.payload.err) {
      try {
        newState[errField] = JSON.parse(action.payload.err);
      } catch (e) {
        newState[errField] = action.payload.err;
      }
    }
    if (action.payload.connection) {
      const { connection } = action.payload;
      if (connection.signMethod === 'ledger') {
        newState[awaitingDeviceField] = (requestState === 'PENDING');
      }
    }
    // Attach any returned transactions
    if (action.payload.tx) {
      newState[txField] = action.payload.tx;
    }
    // Attach any returned ABIs
    if (action.payload.contract) {
      const { abi, account_name } = action.payload.contract;
      newState[contractField] = new EOSContract(abi, account_name);
    }

    if (action.payload.contract_hash) {
      newState[contractHashField] = action.payload.contract_hash;
    } else if (requestName === 'ACCOUNT_HAS_CONTRACT') {
      newState[contractHashField] = null;
    }
  }

  if (requestState === 'SUCCESS' || requestState === 'PENDING') delete newState[errField];
  if (requestState === 'FAILURE') delete newState[txField];

  return newState;
}

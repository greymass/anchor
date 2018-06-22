import * as types from '../actions/types';

export default function system(state = {}, action) {
  const { type } = action;

  if (
    action.type === types.RESET_ALL_STATES
    || action.type === types.RESET_SYSTEM_STATES
  ) {
    return {};
  }

  const matches = /^SYSTEM_(.*)_(PENDING|SUCCESS|FAILURE)$/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  const errField = `${requestName}_LAST_ERROR`;
  const txField = `${requestName}_LAST_TRANSACTION`;

  const newState = {
    ...state,
    [requestName]: requestState,
    errField: '',
    txField: ''
  };

  if (action.payload) {
    // Attempt to process any errors returned
    if (action.payload.err) {
      try {
        newState[errField] = JSON.parse(action.payload.err);
      } catch (e) {
        newState[errField] = action.payload.err;
      }
    }
    // Attach any returned transactions
    if (action.payload.tx) {
      newState[txField] = action.payload.tx;
    }
  }
  return newState;
}

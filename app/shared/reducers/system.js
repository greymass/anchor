import * as types from '../actions/types';

export default function system(state = {}, action) {
  const { type } = action;

  if (action.type === types.RESET_ALL_STATES) {
    return {};
  }

  const matches = /^SYSTEM_(.*)_(PENDING|SUCCESS|FAILURE|NULL)$/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState,
    [`${requestName}_LAST_ERROR`]: action.payload && action.payload.err,
    [`${requestName}_LAST_TRANSACTION`]: action.payload && action.payload.tx
  };
}

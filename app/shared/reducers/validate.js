import * as types from '../actions/types';

export default function validate(state = {}, action) {
  const { type } = action;

  if (
    action.type === types.RESET_ALL_STATES
    || action.type === types.RESET_VALIDATION_STATES
  ) {
    return {};
  }

  const matches = /^VALIDATE_(.*)_(PENDING|SUCCESS|FAILURE)$/.exec(type);
  if (!matches) return state;

  const [, requestName, requestState] = matches;

  return {
    ...state,
    [requestName]: requestState,
    [`${requestName}_ERROR`]: action.payload && action.payload.error
  };
}

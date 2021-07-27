import * as types from '../types';

export function clearSystemState() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_SYSTEM_STATES
    });
  };
}

export default {
  clearSystemState,
};

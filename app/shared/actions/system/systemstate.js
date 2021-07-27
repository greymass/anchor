import * as types from '../types';

function clearSystemState() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_SYSTEM_STATES
    });
  };
}

export {
  clearSystemState,
};

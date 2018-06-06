import * as types from './types';

import eos from './helpers/eos';
import { getCurrencyBalance } from './accounts';

export function transfer(from, to, quantity, memo) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    dispatch({
      type: types.SYSTEM_TRANSFER_PENDING
    });
    return eos(connection).transfer(
      from,
      to,
      quantity,
      memo
    ).then((tx) => {
      dispatch(getCurrencyBalance(from));
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_TRANSFER_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_TRANSFER_FAILURE
    }));
  };
}

export function clearSystemState() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_SYSTEM_STATES
    });
  };
}

export default {
  clearSystemState,
  transfer
};

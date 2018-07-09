import * as types from '../types';

import eos from '../helpers/eos';

export function buyram(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_BUYRAM_PENDING
    });

    const { account } = settings;

    return eos(connection).buyram({
      payer: account,
      receiver: account,
      quant: amount
    }).then((tx) => dispatch({
      payload: { tx },
      type: types.SYSTEM_BUYRAM_SUCCESS
    })).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_BUYRAM_FAILURE
    }));
  };
}

export default {
  buyram
};

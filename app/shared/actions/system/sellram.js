import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function sellram(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_SELLRAM_PENDING
    });

    const { account } = settings;

    return eos(connection, true).sellram({
      account,
      bytes: Number(amount)
    }).then((tx) => {
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: {
          connection,
          tx
        },
        type: types.SYSTEM_SELLRAM_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_SELLRAM_FAILURE
    }));
  };
}

export default {
  sellram
};

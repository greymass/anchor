import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function regproxy() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const { account } = settings;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_REGPROXY_PENDING
    });

    return eos(connection, true).regproxy({
      proxy: account,
      isproxy: 1
    }).then((tx) => {
      // Refresh the account
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: {
          connection,
          tx
        },
        type: types.SYSTEM_REGPROXY_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_REGPROXY_FAILURE
    }));
  };
}

export default {
  regproxy
};

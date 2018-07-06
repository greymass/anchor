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
      type: types.SYSTEM_REGPROXY_PENDING
    });

    return eos(connection).regproxy({
      proxy: account,
      isproxy: 1
    }).then((tx) => {
      // Refresh the account
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REGPROXY_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REGPROXY_FAILURE
    }));
  };
}

export default {
  regproxy
};

import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function unregproxy() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    const { account } = settings;

    dispatch({
      type: types.SYSTEM_UNREGPROXY_PENDING
    });
    return eos(connection).regproxy({
      proxy: account,
      isproxy: 0
    }).then((tx) => {
      // Refresh the account
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_UNREGPROXY_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UNREGPROXY_FAILURE
    }));
  };
}

export default {
  unregproxy
};

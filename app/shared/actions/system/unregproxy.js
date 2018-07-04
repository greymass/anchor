import * as types from '../types';

import eos from '../helpers/eos';

export function unregproxy() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      wallet
    } = getState();
    const { account } = wallet;

    dispatch({
      type: types.SYSTEM_UNREGPROXY_PENDING
    });
    return eos(connection).regproxy({
      proxy: account,
      isproxy: 0
    }).then((tx) => dispatch({
      payload: { tx },
      type: types.SYSTEM_UNREGPROXY_SUCCESS
    })).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UNREGPROXY_FAILURE
    }));
  };
}

export default {
  unregproxy
};

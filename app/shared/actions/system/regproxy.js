import * as types from '../types';

import eos from '../helpers/eos';

export function regproxy() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      wallet
    } = getState();

    const { account } = wallet;

    dispatch({
      type: types.SYSTEM_REGPROXY_PENDING
    });
    return eos(connection).regproxy({
      proxy: account,
      isproxy: true
    }).then((tx) => dispatch({
      payload: { tx },
      type: types.SYSTEM_REGPROXY_SUCCESS
    })).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REGPROXY_FAILURE
    }));
  };
}

export default {
  regproxy
};

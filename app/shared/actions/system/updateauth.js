import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function updateauth(permission, parent, auth) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { account } = settings;
    dispatch({
      type: types.SYSTEM_UPDATEAUTH_PENDING
    });
    return eos(connection, true).updateauth({
      account,
      permission,
      parent,
      auth
    }, {
      authorization: [connection.authorization],
      forceActionDataHex: false,
    }).then((tx) => {
      // Refresh the account
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_UPDATEAUTH_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UPDATEAUTH_FAILURE
    }));
  };
}

export default {
  updateauth
};

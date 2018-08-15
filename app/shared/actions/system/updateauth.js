import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function updateauth(permission, parent, auth, authorizationOverride = false) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { account } = settings;
    dispatch({
      type: types.SYSTEM_UPDATEAUTH_PENDING
    });
    let authorization;
    // Setting of the authorization based on either an override or the global connection setting
    if (authorizationOverride || connection.authorization) {
      authorization = [authorizationOverride || connection.authorization];
    }
    return eos(connection, true).updateauth({
      account,
      permission,
      parent,
      auth
    }, {
      authorization,
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

import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function updateauth(permission, parent, auth, authorizationOverride = false) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { account, authorization } = settings;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_UPDATEAUTH_PENDING
    });

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'updateauth',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            account,
            permission,
            parent,
            auth,
          }
        }
      ],
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => {
      // Refresh the account
      setTimeout(dispatch(getAccount(account)), 500);
      return dispatch({
        payload: {
          connection,
          tx
        },
        type: types.SYSTEM_UPDATEAUTH_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_UPDATEAUTH_FAILURE
    }));
  };
}

export default {
  updateauth
};

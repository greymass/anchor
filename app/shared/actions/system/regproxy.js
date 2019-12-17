import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function regproxy() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const { account, authorization } = settings;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_REGPROXY_PENDING
    });

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'regproxy',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            proxy: account,
            isproxy: true
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

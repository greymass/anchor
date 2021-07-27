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

    const { account, authorization } = settings;

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'sellram',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            account,
            bytes: Number(amount)
          }
        }
      ],
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
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

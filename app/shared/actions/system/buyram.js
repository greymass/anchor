import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function buyram(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_BUYRAM_PENDING
    });

    const { account, authorization } = settings;

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'buyram',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            payer: account,
            receiver: account,
            quant: `${amount.toFixed(4)} ${connection.chainSymbol || 'EOS'}`
          }
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => {
      console.log({tx})
      setTimeout(dispatch(getAccount(account)), 500);

      return dispatch({
        payload: {
          connection,
          tx
        },
        type: types.SYSTEM_BUYRAM_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_BUYRAM_FAILURE
    }));
  };
}

export default {
  buyram
};

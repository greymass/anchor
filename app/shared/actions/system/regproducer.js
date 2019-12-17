import * as types from '../types';

import eos from '../helpers/eos';
import { delegatebwParams } from './delegatebw';

export function regproducer(producerKey, producerUrl, producerLocation = 0) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const { account, authorization } = settings;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_REGPRODUCER_PENDING
    });

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'regproducer',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            producer: account,
            producer_key: producerKey,
            url: producerUrl,
            location: 0
          }
        }
      ],
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => dispatch({
      payload: {
        connection,
        tx
      },
      type: types.SYSTEM_REGPRODUCER_SUCCESS
    })).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_REGPRODUCER_FAILURE
    }));
  };
}

export default {
  regproducer
};

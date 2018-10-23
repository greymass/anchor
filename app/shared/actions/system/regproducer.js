import * as types from '../types';

import eos from '../helpers/eos';

export function regproducer(producerKey, producerUrl, producerLocation = 0) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    const { account } = settings;
    dispatch({
      payload: { connection },
      type: types.SYSTEM_REGPRODUCER_PENDING
    });
    return eos(connection, true).regproducer({
      producer: account,
      producer_key: producerKey,
      url: producerUrl,
      location: 0
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

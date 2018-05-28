import * as types from '../types';

import eos from '../helpers/eos';

export function regproducer(producerKey, producerUrl, producerLocation = 0) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    const { account } = settings;
    eos(connection).regproducer({
      producer: account,
      producer_key: producerKey,
      url: producerUrl,
      location: 0
    }).then((result) => {
      console.log(result);
    })
  };
}

export default {
  regproducer
};

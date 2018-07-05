import * as types from '../types';

import eos from '../helpers/eos';

export function voteproducers(producers = [], proxyAccount = '') {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    dispatch({
      type: types.SYSTEM_VOTEPRODUCER_REQUEST
    });
    const { account } = settings;
    producers.sort();
    return eos(connection).voteproducer(account, proxyAccount, producers)
      .then((tx) => dispatch({
        payload: { tx, producers },
        type: types.SYSTEM_VOTEPRODUCER_SUCCESS
      }))
      .catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_VOTEPRODUCER_FAILURE
      }));
  };
}

export default {
  voteproducers
};

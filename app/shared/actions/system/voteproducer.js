import * as types from '../types';

import eos from '../helpers/eos';

export function voteproducers(producers = []) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    dispatch({
      type: types.SET_ACCOUNT_PRODUCER_VOTES_REQUEST
    });
    const { account } = settings;
    producers.sort();
    return eos(connection).voteproducer(account, '', producers)
      .then((tx) => dispatch({
        payload: { tx, producers },
        type: types.SET_ACCOUNT_PRODUCER_VOTES_SUCCESS
      }))
      .catch((err) => dispatch({
        payload: { err },
        type: types.SET_ACCOUNT_PRODUCER_VOTES_FAILURE
      }));
  };
}

export default {
  voteproducers
};

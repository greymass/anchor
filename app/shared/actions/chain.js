import * as types from './types';

import eos from './helpers/eos';

export function getInfo() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CHAIN_INFO_REQUEST
    });
    const { connection, settings } = getState();
    eos(connection).getInfo(true).then((chain) => dispatch({
      type: types.GET_CHAIN_INFO_SUCCESS,
      payload: { chain, settings }
    })).catch((err) => dispatch({
      type: types.GET_CHAIN_INFO_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getInfo
};

import * as types from './types';

import eos from './helpers/eos';

export function getInfo(settings) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CHAIN_INFO_REQUEST
    });
    const state = getState();
    eos(state).getInfo(true).then((results) => dispatch({
      type: types.GET_CHAIN_INFO_SUCCESS,
      payload: { chain: results }
    })).catch((err) => dispatch({
      type: types.GET_CHAIN_INFO_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getInfo
};

import * as types from './types';

export function setStorage(data) {
  return async (dispatch: () => void) => {
    // flush to disk
    if (window && window.persistor) {
      setTimeout(window.persistor.flush, 2000);
    }
    // update store
    return dispatch({
      type: types.WALLET_STORAGE_UPDATE,
      payload: data
    });
  };
}

export default {
  setStorage
};

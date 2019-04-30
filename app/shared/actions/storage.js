import * as types from './types';

export function setStorage(data) {
  return (dispatch: () => void) => dispatch({
    type: types.WALLET_STORAGE_UPDATE,
    payload: data
  });
}

export default {
  setStorage
};

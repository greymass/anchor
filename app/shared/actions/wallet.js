import * as types from './types';

export function setWalletKey(value) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_WALLET_KEY,
      payload: {
        key: value
      }
    });
  };
}

export default {
  setWalletKey
};

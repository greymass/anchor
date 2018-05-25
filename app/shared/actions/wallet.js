import * as types from './types';
import * as validate from './validate';

export function setWalletKey(settings, value) {
  return (dispatch: () => void) => {
    dispatch(validate.validateKey(settings, value));
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

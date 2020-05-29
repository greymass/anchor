import * as types from './types';
import { configureStore } from '../store/renderer/configureStore';

const { persistor } = configureStore();

export function setStorage(data) {
  return async (dispatch: () => void) => {
    // flush persisted state to disk in a few moments
    setTimeout(() => {
      persistor.flush();
    }, 2000);
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

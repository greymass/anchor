import { send } from 'redux-electron-ipc';
import * as types from './types';

export function setPreference(key, value) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_SETTING,
      payload: {
        [key]: value
      }
    });
  };
}

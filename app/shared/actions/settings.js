import * as types from './types';
import * as validate from './validate';

const { remote } = require('electron');

export function clearSettingsCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_ALL_STATES
    });
    remote.getCurrentWindow().reload();
  };
}

export function setSetting(key, value) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_SETTING,
      payload: {
        [key]: value
      }
    });
  };
}

export function setSettingWithValidation(settings, key, value) {
  return (dispatch: () => void) => {
    const nextSettings = {
      ...settings,
      [key]: value
    };
    switch (key) {
      case 'account': {
        dispatch(validate.validateAccount(nextSettings, value));
        break;
      }
      case 'node': {
        dispatch({ type: types.CLEAR_ACCOUNT_CACHE });
        dispatch({ type: types.CLEAR_PRODUCER_CACHE });
        dispatch(validate.validateNode(nextSettings, value));
        break;
      }
      default: {
        break;
      }
    }
    dispatch({
      type: types.SET_SETTING,
      payload: {
        [key]: value
      }
    });
  };
}

export default {
  clearSettingsCache,
  setSetting,
  setSettingWithValidation
};

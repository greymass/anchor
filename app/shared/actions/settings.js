import * as types from './types';
import { clearAccountCache } from './accounts';
import * as validate from './validate';
import { removeWallet, setWalletMode } from './wallet';

const { remote } = require('electron');

export function clearSettingsCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_ALL_STATES
    });
    remote.getCurrentWindow().reload();
  };
}

export function clearSettingsInvalid() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_INVALID_SETTINGS
    });
  };
}

export function resetApp() {
  return (dispatch: () => void) => {
    dispatch(clearSettingsCache());
    dispatch(clearAccountCache());
    dispatch(validate.clearValidationState());
    dispatch(removeWallet());
    dispatch(setSetting('skipImport', false));
    dispatch(setWalletMode('hot'));
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

export function setSettings(values) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_SETTING,
      payload: values
    });
  };
}

export function setSettingWithValidation(key, value) {
  return (dispatch: () => void) => {
    switch (key) {
      case 'account': {
        dispatch(validate.validateAccount(value));
        break;
      }
      case 'node': {
        // If nodes are changing, force clear any locally cached data
        dispatch({ type: types.CLEAR_ACCOUNT_CACHE });
        dispatch({ type: types.CLEAR_PRODUCER_CACHE });
        dispatch(validate.validateNode(value));
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
  clearSettingsInvalid,
  setSetting,
  setSettings,
  setSettingWithValidation
};

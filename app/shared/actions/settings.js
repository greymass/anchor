import * as types from './types';
import { clearAccountCache, refreshAccountBalances } from './accounts';
import * as validate from './validate';
import { setWalletMode } from './wallet';
import { removeWallet } from './wallets';

const { ipcRenderer } = require('electron');

function clearSettingsCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_ALL_STATES
    });
  };
}

function clearSettingsInvalid() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_INVALID_SETTINGS
    });
  };
}

function resetApp() {
  return (dispatch: () => void) => {
    dispatch(clearSettingsCache());
    dispatch(clearAccountCache());
    dispatch(validate.clearValidationState());
    dispatch(removeWallet());
    dispatch(setSetting('skipImport', false));
    dispatch(setWalletMode('hot'));
    if (ipcRenderer) {
      ipcRenderer.send('connectSessionManager');
    }
  };
}

function setSetting(key, value, chainId = false) {
  return (dispatch: () => void) => {
    const payload = { [key]: value };
    if (chainId) {
      payload.__id = chainId;
    }
    dispatch({
      type: types.SET_SETTING,
      payload
    });
  };
}

function setSettings(values) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_SETTING,
      payload: values
    });
  };
}

function setSettingWithValidation(key, value) {
  return (dispatch: () => void) => {
    switch (key) {
      case 'account': {
        dispatch(validate.validateAccount(value));
        break;
      }
      case 'node': {
        // If nodes are changing, force clear any locally cached data
        dispatch({ type: types.CLEAR_ACCOUNT_CACHE });
        dispatch({ type: types.CLEAR_BALANCE_CACHE });
        dispatch({ type: types.CLEAR_PRODUCER_CACHE });
        dispatch(validate.validateNode(value, false, true, true, true));
        break;
      }
      default: {
        break;
      }
    }
    return dispatch({
      type: types.SET_SETTING,
      payload: {
        [key]: value
      }
    });
  };
}

function addCustomToken(contract, symbol) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { customTokens } = settings;

    const name = [connection.chainId, contract.toLowerCase(), symbol.toUpperCase()].join(':');

    let tokens = [];
    if (customTokens) {
      tokens = customTokens.slice(0);
    }

    if (name && name.length > 0) {
      tokens.push(name);
      tokens = new Set(tokens.filter((e) => e));
      dispatch(setSetting('customTokens', Array.from(tokens).sort()));
    }
    return dispatch(refreshAccountBalances(settings.account, [name]));
  };
}

function addCustomTokenBeos(contract, symbol) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { customTokens } = settings;

    const name = [connection.chainId, contract.toLowerCase(), symbol.toUpperCase()].join(':');

    let tokens = [];
    if (customTokens) {
      tokens = customTokens.slice(0);
    }

    if (name && name.length > 0) {
      tokens.push(name);
      tokens = new Set(tokens.filter((e) => e));
      return dispatch(setSetting('customTokens', Array.from(tokens).sort()));
    }
  };
}

function removeCustomToken(contract, symbol) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const { customTokens } = settings;

    const name = [connection.chainId, contract.toLowerCase(), symbol.toUpperCase()].join(':');

    let tokens = [];
    if (customTokens) {
      tokens = customTokens.slice(0);
    }

    const position = tokens.indexOf(name);
    if (position >= 0) {
      tokens.splice(position, 1);
      tokens = new Set(tokens.filter((e) => e));
      dispatch(setSetting('customTokens', Array.from(tokens)));
    }
    return dispatch(refreshAccountBalances(settings.account, [name]));
  };
}

function setRecentContractAction(contractName, actionName) {
  return (dispatch: () => void) => dispatch({
    type: types.SET_RECENT_CONTRACT_ACTION,
    payload: {
      contractName,
      actionName,
    }
  });
}

export {
  addCustomToken,
  clearSettingsCache,
  clearSettingsInvalid,
  removeCustomToken,
  setSetting,
  setSettings,
  setSettingWithValidation
};

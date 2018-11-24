import * as types from './types';
import eos from './helpers/eos';

export function setConnectionBroadcast(enable = true) {
  return (dispatch: () => void) => {
    dispatch({
      payload: { enable },
      type: types.SET_CONNECTION_BROADCAST
    });
  };
}

export function setConnectionSign(enable = true) {
  return (dispatch: () => void) => {
    dispatch({
      payload: { enable },
      type: types.SET_CONNECTION_SIGN
    });
  };
}

export function historyPluginCheck() {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    return eos(connection).getKeyAccounts(settings).then(() => dispatch({
      type: types.SET_CONNECTION_HISTORY_PLUGIN_ENABLED,
      payload: { enabled: true }
    })).catch(() => dispatch({
      type: types.SET_CONNECTION_HISTORY_PLUGIN_ENABLED,
      payload: { enabled: false }
    }));
  };
}

export default {
  historyPluginCheck,
  setConnectionBroadcast,
  setConnectionSign,
};

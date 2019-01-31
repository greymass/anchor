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
    } = getState();
    let historyAccount;
    switch (connection.chainId) {
      case 'b912d19a6abd2b1b05611ae5be473355d64d95aeff0c09bedc8c166cd6468fe4': {
        historyAccount = 'beos.gateway';
        break;
      }
      default: {
        historyAccount = 'teamgreymass';
        break;
      }
    }
    return eos(connection).getActions(historyAccount).then((result) => dispatch({
      type: types.SET_CONNECTION_HISTORY_PLUGIN_ENABLED,
      payload: { enabled: (result.actions && result.actions.length !== 0) }
    })).catch(() => dispatch({
      type: types.SET_CONNECTION_HISTORY_PLUGIN_ENABLED,
      payload: { enabled: false }
    }));
  };
}

export function setChainId(chainId) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_CHAIN_ID,
      payload: { chainId }
    });
  };
}

export default {
  historyPluginCheck,
  setChainId,
  setConnectionBroadcast,
  setConnectionSign,
};

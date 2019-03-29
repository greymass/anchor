// @flow
import * as types from '../types';
import HardwareLedger from '../../utils/Hardware/Ledger';

const Api = require('../helpers/hardware/ledger').default;
const Transport = require('@ledgerhq/hw-transport-node-hid').default;

const { ipcRenderer, remote } = require('electron');

function handleComplete() {
  console.log('complete fired');
}

function handleError(error) {
  console.log('handleError', error);
}

export function getAppConfiguration() {
  return (dispatch: () => void) => {
    const hardwareLedger = global.hardwareLedger || remote.getGlobal('hardwareLedger');
    const { transport } = hardwareLedger;
    const api = new Api(transport);
    return api
      .getAppConfiguration()
      .then((result) => {
        dispatch({
          payload: {
            application: result,
            transport,
          },
          type: types.HARDWARE_LEDGER_APP_SUCCESS,
        });
        return result;
      })
      .catch((error) => {
        dispatch({
          payload: {
            error,
            transport,
          },
          type: types.HARDWARE_LEDGER_APP_FAILURE,
        });
        setTimeout(() => {
          if (error.message && error.message.startsWith('Cannot write to HID device')) {
            dispatch(ledgerStopListen());
            return dispatch(ledgerStartListen());
          }
          return dispatch(getAppConfiguration());
        }, 1000);
      });
  };
}

function handleEvent(event) {
  return (dispatch: () => void, getState) => {
    switch (event.type) {
      case 'add': {
        const isConnected = (getState().ledger.devicePath !== null);
        const isCurrentDevice = (getState().ledger.devicePath === event.device.path);
        const isAppRunning = (getState().ledger.application !== null);
        const signPath = (getState().wallet.path);
        if (!isConnected) {
          if (!isCurrentDevice || !isAppRunning) {
            ipcRenderer.send('connectHardwareLedger', signPath, event.device.path);
          }
        }
        break;
      }
      case 'remove': {
        const ledger = new HardwareLedger().destroy();
        return dispatch({
          type: types.HARDWARE_LEDGER_DEVICE_DISCONNECTED
        });
      }
      default: {
        console.log('unhandled event', event, getState());
      }
    }
  };
}

export function ledgerStartListen() {
  return (dispatch: () => void, getState) => {
    const hardwareLedger = global.hardwareLedger || remote.getGlobal('hardwareLedger');
    hardwareLedger.destroy();
    if (getState().ledger.subscriber !== null) {
      return;
    }

    dispatch({
      type: types.HARDWARE_LEDGER_LISTEN_INIT
    });

    if (process.env.NODE_ENV === 'development') {
      Transport.setListenDevicesDebug(true);
    }

    const subscriber = Transport.listen({
      complete: () => dispatch(handleComplete()),
      error: (error) => dispatch(handleError(error)),
      next: (event) => dispatch(handleEvent(event)),
    });

    dispatch({
      payload: {
        subscriber
      },
      type: types.HARDWARE_LEDGER_LISTEN_START,
    });
  };
}

export function ledgerStopListen() {
  return (dispatch: () => void, getState) => {
    const { ledger } = getState();
    const {
      subscriber
    } = ledger;
    const hardwareLedger = global.hardwareLedger || remote.getGlobal('hardwareLedger');
    const { transport } = hardwareLedger;
    if (transport && transport.close) {
      transport.close();
    }

    if (subscriber && subscriber.unsubscribe) {
      ledger.subscriber.unsubscribe();
    }

    hardwareLedger.destroy();

    dispatch({
      type: types.HARDWARE_LEDGER_LISTEN_STOP
    });
  };
}

export function ledgerGetPublicKey(index = 0, display = false) {
  return (dispatch: () => void, getState) => {
    const { ledger } = getState();
    dispatch({
      type: (display)
        ? types.SYSTEM_LEDGER_DISPLAY_PUBLIC_KEY_PENDING
        : types.SYSTEM_LEDGER_GET_PUBLIC_KEY_PENDING
    });
    const hardwareLedger = global.hardwareLedger || remote.getGlobal('hardwareLedger');
    const { transport } = hardwareLedger;
    const api = new Api(transport);
    const pathParts = ledger.bip44Path.split('/');
    pathParts[4] = parseInt(index, 10);
    const path = pathParts.join('/');
    api
      .getPublicKey(path, display)
      .then(result => {
        const type = display
          ? types.SYSTEM_LEDGER_DISPLAY_PUBLIC_KEY_SUCCESS
          : types.SYSTEM_LEDGER_GET_PUBLIC_KEY_SUCCESS;
        return dispatch({
          payload: {
            path,
            publicKey: result,
          },
          type,
        });
      })
      .catch(err => {
        const type = display
          ? types.SYSTEM_LEDGER_DISPLAY_PUBLIC_KEY_FAILURE
          : types.SYSTEM_LEDGER_GET_PUBLIC_KEY_FAILURE;
        dispatch({ type, err });
      });
  };
}

export function ledgerResetPublicKey() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_PUBLIC_KEY_SUCCESS
    });
  };
}

export function ledgerGetStatus(state) {
  let status = false;
  // If the wallet is looking for a Ledger
  if (state.listening) {
    status = 'awaiting_connection';
    // If the wallet is connected
    const hardwareLedger = global.hardwareLedger || remote.getGlobal('hardwareLedger');
    const { transport } = hardwareLedger;
    if (state.devicePath && state.application && state.application.version && transport) {
      status = 'connected';
    }
  }
  // If a transport error occurred
  if (state.transportError && state.transportError.message) {
    const { message } = state.transportError;
    // If the transport is not yet allowed
    if (message.startsWith('cannot open device with path')) {
      status = 'awaiting_allow';
    }
  }
  // If an application error occurred
  if (state.applicationError && state.applicationError.message) {
    const { statusCode } = state.applicationError;
    switch (statusCode) {
      // If the application is not running on the device
      case 28160: {
        status = 'awaiting_application';
        break;
      }
      // Unknown errors
      default: {
        if (state.applicationError && state.applicationError.message) {
          const { message } = state.applicationError;
          // If the transport is not yet allowed
          if (message.startsWith('Cannot write to HID device')) {
            status = 'reinitializing';
          }
        }
        if (!status) {
          console.log('unknown application error code', statusCode, state.applicationError);
          status = 'application_error';
        }
      }
    }
  }
  return status;
}

export default {
  getAppConfiguration,
  ledgerGetPublicKey,
  ledgerGetStatus,
  ledgerResetPublicKey,
  ledgerStartListen,
  ledgerStopListen,
};

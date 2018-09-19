// @flow
import * as types from '../types';

const Api = require('../helpers/hardware/ledger').default;
const Transport = require('@ledgerhq/hw-transport-node-hid').default;

function handleComplete() {
  console.log("complete fired");
}

function handleError(error) {
  console.log("handleError", error)
}

function getAppConfiguration() {
  return (dispatch: () => void, getState) => {
    const { transport } = getState().ledger;
    const api = new Api(transport);
    return api
      .getAppConfiguration()
      .then((result) => {
        dispatch({
          application: result,
          transport,
          type: types.HARDWARE_LEDGER_APP_SUCCESS,
        });
        return result;
      })
      .catch((error) => {
        dispatch({
          error,
          transport,
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
        if (!isConnected) {
          if (!isCurrentDevice || !isAppRunning) {
            Transport
              .open(event.device.path)
              .then((transport) => {
                // if (process.env.NODE_ENV === 'development') {
                //   transport.setDebugMode(true);
                // }
                dispatch({
                  devicePath: event.device.path,
                  transport,
                  type: types.HARDWARE_LEDGER_TRANSPORT_SUCCESS
                });
                dispatch(getAppConfiguration());
                return transport;
              })
              .catch((error) => {
                setTimeout(() => {
                  dispatch(ledgerStartListen());
                }, 1000);
                dispatch({
                  type: types.HARDWARE_LEDGER_TRANSPORT_FAILURE,
                  error
                });
              });
          }
        }
        break;
      }
      case 'remove': {
        return dispatch({ type: types.HARDWARE_LEDGER_DEVICE_DISCONNECTED });
      }
      default: {
        console.log('unhandled event', event, getState());
      }
    }
  };
}

export function ledgerStartListen() {
  return (dispatch: () => void, getState) => {
    if (getState().ledger.subscriber !== null) {
      return;
    }

    dispatch({
      type: types.HARDWARE_LEDGER_LISTEN_INIT
    });

    // if (process.env.NODE_ENV === 'development') {
    //   Transport.setListenDevicesDebug(true);
    // }

    const subscriber = Transport.listen({
      complete: () => dispatch(handleComplete()),
      error: (error) => dispatch(handleError(error)),
      next: (event) => dispatch(handleEvent(event)),
    });

    dispatch({
      type: types.HARDWARE_LEDGER_LISTEN_START,
      subscriber
    });
  };
}

export function ledgerStopListen() {
  return (dispatch: () => void, getState) => {
    const { ledger } = getState();
    const {
      subscriber,
      transport,
    } = ledger;

    if (transport && transport.close) {
      transport.close();
    }

    if (subscriber && subscriber.unsubscribe) {
      ledger.subscriber.unsubscribe();
    }

    dispatch({
      type: types.HARDWARE_LEDGER_LISTEN_STOP
    });
  };
}

export function ledgerGetPublicKey(display = false) {
  return (dispatch: () => void, getState) => {
    const { ledger } = getState();

    const api = new Api(ledger.transport);
    if (display) {
      dispatch({
        type: types.PUBLIC_KEY_DISPLAY_REQUEST
      });
    }

    api
      .getPublicKey(ledger.bip44Path, display)
      .then(result => {
        const type = display
          ? types.PUBLIC_KEY_DISPLAY_SUCCESS
          : types.GET_PUBLIC_KEY_SUCCESS;
        return dispatch({ type, publicKey: result });
      })
      .catch(err => {
        const type = display
          ? types.PUBLIC_KEY_DISPLAY_FAILURE
          : types.GET_PUBLIC_KEY_FAILURE;
        dispatch({ type, err });
        setTimeout(() => {
          dispatch(ledgerGetPublicKey(display));
        }, 1000);
      });
  };
}

export default {
  ledgerGetPublicKey,
  ledgerStartListen,
  ledgerStopListen,
};

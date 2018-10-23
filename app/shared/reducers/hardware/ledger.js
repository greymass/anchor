// @flow
import * as types from '../../actions/types';

const initialState = {
  // Application Information
  application: null,
  // Error Responses
  applicationError: null,
  // Base bath
  bip44Path: "44'/194'/0'/0/0",
  // Path to the device
  devicePath: null,
  // Is the device displaying a key?
  displayingKey: false,
  // Is the key being retrieved?
  loadingKey: false,
  // Is the app listening for a connection
  listening: false,
  // Path Used
  path: null,
  // Public Key returned from Device
  publicKey: null,
  // Subscriber (with unsubscribe)
  subscriber: null,
  // Connection Status
  status: null,
  // Transport Object
  transport: null,
  // Error from Transport
  transportError: null
};

export default function ledger(state = initialState, action) {
  switch (action.type) {
    case types.HARDWARE_LEDGER_LISTEN_START: {
      return Object.assign({}, state, {
        subscriber: action.payload.subscriber
      });
    }
    case types.HARDWARE_LEDGER_LISTEN_INIT: {
      return Object.assign({}, state, {
        application: null,
        displayingKey: false,
        listening: true,
        publicKey: null,
        subscriber: null,
      });
    }
    case types.HARDWARE_LEDGER_LISTEN_STOP: {
      return Object.assign({}, state, {
        application: null,
        devicePath: null,
        displayingKey: false,
        listening: false,
        publicKey: null,
        subscriber: null,
      });
    }
    case types.HARDWARE_LEDGER_DEVICE_CONNECTED: {
      return Object.assign({}, state, {
        application: null,
        devicePath: action.payload.devicePath,
      });
    }
    case types.HARDWARE_LEDGER_DEVICE_DISCONNECTED: {
      return Object.assign({}, state, {
        application: null,
        devicePath: null,
        displayingKey: false,
      });
    }
    case types.SYSTEM_LEDGER_GET_PUBLIC_KEY_PENDING: {
      return Object.assign({}, state, {
        loadingKey: true,
        path: null,
        publicKey: null
      });
    }
    case types.SYSTEM_LEDGER_GET_PUBLIC_KEY_SUCCESS: {
      return Object.assign({}, state, {
        loadingKey: false,
        path: action.payload.path,
        publicKey: action.payload.publicKey
      });
    }
    case types.RESET_PUBLIC_KEY_SUCCESS:
    case types.SYSTEM_LEDGER_GET_PUBLIC_KEY_FAILURE: {
      return Object.assign({}, state, {
        displayingKey: false,
        loadingKey: false,
        path: null,
        publicKey: null,
      });
    }
    case types.HARDWARE_LEDGER_APP_SUCCESS: {
      return Object.assign({}, state, {
        application: action.payload.application,
        applicationError: null
      });
    }
    case types.HARDWARE_LEDGER_APP_FAILURE: {
      return Object.assign({}, state, {
        application: null,
        applicationError: action.payload.error
      });
    }
    case types.HARDWARE_LEDGER_TRANSPORT_SUCCESS: {
      return Object.assign({}, state, {
        devicePath: action.payload.devicePath,
        transportError: null
      });
    }
    case types.HARDWARE_LEDGER_TRANSPORT_FAILURE: {
      return Object.assign({}, state, {
        application: null,
        applicationError: null,
        displayingKey: false,
        subscriber: null,
        transportError: action.payload.error
      });
    }
    case types.SYSTEM_LEDGER_DISPLAY_PUBLIC_KEY_PENDING: {
      return Object.assign({}, state, {
        displayingKey: true,
      });
    }
    case types.SYSTEM_LEDGER_DISPLAY_PUBLIC_KEY_SUCCESS: {
      return Object.assign({}, state, {
        displayingKey: false,
      });
    }
    default: {
      return state;
    }
  }
}

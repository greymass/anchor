// @flow
import * as types from '../../actions/types';

const initialState = {
  application: null,
  applicationError: null,
  bip44Path: "44'/194'/0'/0/0",
  devicePath: null,
  listening: false,
  publicKey: null,
  subscriber: null,
  status: null,
  transport: null,
  transportError: null
};

export default function ledger(state = initialState, action) {
  switch (action.type) {
    case types.HARDWARE_LEDGER_LISTEN_START: {
      return Object.assign({}, state, {
        subscriber: action.subscriber
      });
    }
    case types.HARDWARE_LEDGER_LISTEN_INIT: {
      return Object.assign({}, state, {
        application: null,
        listening: true,
        publicKey: null,
        subscriber: null,
        transport: null
      });
    }
    case types.HARDWARE_LEDGER_LISTEN_STOP: {
      return Object.assign({}, state, {
        application: null,
        devicePath: null,
        listening: false,
        publicKey: null,
        subscriber: null,
        transport: null
      });
    }
    case types.HARDWARE_LEDGER_DEVICE_CONNECTED: {
      return Object.assign({}, state, {
        application: null,
        devicePath: action.devicePath,
        transport: null,
      });
    }
    case types.HARDWARE_LEDGER_DEVICE_DISCONNECTED: {
      return Object.assign({}, state, {
        application: null,
        devicePath: null,
        transport: null,
      });
    }
    case types.GET_PUBLIC_KEY_SUCCESS: {
      return Object.assign({}, state, {
        publicKey: action.publicKey
      });
    }
    case types.GET_PUBLIC_KEY_FAILURE: {
      return Object.assign({}, state, {
        publicKey: null
      });
    }
    case types.HARDWARE_LEDGER_APP_SUCCESS: {
      return Object.assign({}, state, {
        application: action.application,
        applicationError: null
      });
    }
    case types.HARDWARE_LEDGER_APP_FAILURE: {
      return Object.assign({}, state, {
        application: null,
        applicationError: action.error
      });
    }
    case types.HARDWARE_LEDGER_TRANSPORT_SUCCESS: {
      return Object.assign({}, state, {
        devicePath: action.devicePath,
        transport: action.transport,
        transportError: null
      });
    }
    case types.HARDWARE_LEDGER_TRANSPORT_FAILURE: {
      return Object.assign({}, state, {
        application: null,
        applicationError: null,
        subscriber: null,
        transport: null,
        transportError: action.error
      });
    }
    default: {
      return state;
    }
  }
}

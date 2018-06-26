import * as types from '../actions/types';

const initialState = {
  // If the active session has accepted the EOS constitution
  acceptedConstitution: false,
  // The loaded account
  account: '',
  // Custom tokens the wallet should be tracking
  customTokens: [],
  // Default language
  lang: 'en-US',
  // The node to connect to
  node: '',
  // Allows the UI to start with only a connected node
  skipImport: false,
  // Window State Management
  setupData: {},
  // Wallet Status
  walletInit: false,
  // Wallet Mode (hot/cold/watch)
  walletMode: 'hot',
  // Wallet is Temporary
  walletTemp: false
};

const validSettings = Object.keys(initialState);

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.WALLET_REMOVE: {
      return Object.assign({}, state, {
        account: '',
        walletInit: false,
        walletMode: 'hot'
      });
    }
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    case types.RESET_INVALID_SETTINGS: {
      return Object.assign({}, validSettings.reduce((o, setting) =>
        ({ ...o, [setting]: state[setting] }), {}));
    }
    default: {
      return state;
    }
  }
}

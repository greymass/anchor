import { get } from 'dot-prop-immutable';

import * as types from '../actions/types';

const initialState = {
  // If the active session has accepted the EOS constitution
  acceptedConstitution: false,
  // If the wallet has ackknowledged understanding the smart contract tool
  acceptedContractInterface: false,
  // The loaded account
  account: '',
  // The block explorer used
  blockExplorer: 'bloks.io',
  // Custom tokens the wallet should be tracking
  customTokens: [
    // Always track the EOS token
    'eosio.token:EOS'
  ],
  // Default language
  lang: '',
  // The node to connect to
  node: '',
  // Recent contracts the wallet has recently used
  recentContracts: [],
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
    case types.SYSTEM_GETABI_SUCCESS: {
      const recentContracts = [...state.recentContracts];
      const contractName = get(action, 'payload.contract.account_name');
      if (!recentContracts.includes(contractName)) {
        recentContracts.unshift(contractName);
      }
      return Object.assign({}, state, {
        recentContracts: recentContracts.slice(0, 50)
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

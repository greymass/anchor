import { get } from 'dot-prop-immutable';

import * as types from '../actions/types';

const initialState = {
  // If the active session has accepted the EOSIO Constitution/Network Operating Agreement
  acceptedConstitution: false,
  // If the wallet has ackknowledged understanding the smart contract tool
  acceptedContractInterface: false,
  // Enable advanced permissions management
  advancedPermissions: false,
  // The loaded account
  account: '',
  // The block explorer used
  blockExplorer: 'bloks.io',
  // List of contacts
  contacts: [],
  // Custom tokens the wallet should be tracking
  customTokens: [
    // Always track the contract for the core system token
    // actual token symbol changes based on current chain
    'eosio.token:'
  ],
  // Support multiple chains
  blockchains: [
    {
      blockchain:'Telos Testnet', 
      prefix:'TLOS',
      node:'https://api.eos.miami:17441',
      chainId: '6c8aacc339bf1567743eb9c8ab4d933173aa6dca4ae6b6180a849c422f5bb207'
    },
    {
      blockchain:'EOS Mainnet', 
      prefix:'EOS',
      node:'https://eos.greymass.com',
      chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    },
    {
      blockchain:'Jungle Testnet',
      prefix:'EOS',
      node:'http://jungle.cryptolions.io:18888',
      chainId:'038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca'
    }
  ],
  // Defaults to displaying resources remaining
  displayResourcesAvailable: false,
  // Default filter spam transfers to false
  filterSpamTransfersUnder: 0.0000,
  // Default Idle Timeout
  idleTimeout: 999999999,
  // Default language
  lang: '',
  // The node to connect to
  node: '',
  // The current blockchain
  blockchain: {},
  // Recent contracts the wallet has used
  recentContracts: [],
  // Recent referendum scopes the wallet has used
  recentProposalsScopes: [],
  // Allows the UI to start with only a connected node
  skipImport: false,
  // Allows users to go to link directly (without passing through DangerLink) when set to true
  skipLinkModal: false,
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
    case types.SYSTEM_GOVERNANCE_GET_PROPOSALS_SUCCESS: {
      const recentProposalsScopes = [...state.recentProposalsScopes];
      const scopeName = get(action, 'payload.scope');
      if (!recentProposalsScopes.includes(scopeName)) {
        recentProposalsScopes.unshift(scopeName);
      }
      return Object.assign({}, state, {
        recentProposalsScopes: recentProposalsScopes.slice(0, 50)
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

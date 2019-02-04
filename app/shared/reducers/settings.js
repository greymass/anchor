import { get, set } from 'dot-prop-immutable';

import * as types from '../actions/types';

const initialState = {
  // If the active session has accepted the EOS constitution
  acceptedConstitution: false,
  // If the wallet has acknowledged understanding the smart contract tool
  acceptedContractInterface: false,
  // If the wallet has acknowledged understanding the crosschain tool and it's 3rd party APIs
  acceptedCrosschainTransfers: false,
  // If the wallet has acknowledged understanding privacy concerns of the ping tool
  acceptedPingInterface: false,
  // Enable advanced permissions management
  advancedPermissions: false,
  // The loaded account
  account: '',
  // The loaded authorization
  authorization: undefined,
  // The block explorer used
  blockExplorer: 'bloks.io',
  // Current chain_id
  chainId: false,
  // Additional settings per blockchain
  chainSettings: {},
  // List of contacts
  contacts: [],
  // Custom tokens the wallet should be tracking
  customTokens: [
    // Always track the EOS token
    'eos-mainnet:eosio.token:EOS'
  ],
  // State to view by default in DevTest
  devTestDefaultState: false,
  // Defaults to displaying resources remaining
  displayResourcesAvailable: true,
  // Whether or not to display known testnets for the various networks
  displayTestNetworks: false,
  // Default filter spam transfers to false
  filterSpamTransfersUnder: 0.0000,
  // Default to Ledger import process
  hardwareLedgerImport: false,
  // Enable hardware support for Ledger devices
  hardwareLedgerSupport: false,
  // Default Idle Timeout
  idleTimeout: 999999999,
  // Default language
  lang: '',
  // Last location a file was opened/saved from
  lastFilePath: '',
  // The node to connect to
  node: '',
  // Recent names that the wallet has bid on.
  recentBids: {},
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
  // Wallet Password Validity Hash
  walletHash: false,
  // Wallet Status
  walletInit: false,
  // Wallet Mode (hot/cold/watch)
  walletMode: 'hot',
  // Wallet is Temporary
  walletTemp: false,
};

const validSettings = Object.keys(initialState);

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SET_WALLET_HASH: {
      return Object.assign({}, state, {
        walletHash: action.payload.hash
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
      if (action.payload.__id) {
        const { payload } = Object.assign({}, action);
        const { __id } = action.payload;
        delete payload.__id;
        return Object.assign({}, state, {
          chainSettings: set(get(state, 'chainSettings', {}), `${__id}`, payload)
        });
      }
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

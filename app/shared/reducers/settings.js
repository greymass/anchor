import { get, set } from 'dot-prop-immutable';
import { pull, uniq } from 'lodash';
import { v4 as uuid } from 'uuid';

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
  // Whether or not to display advanced user options in various parts of the app
  advancedOptions: false,
  // Allow dangerous transactions via EEP-7 Signing Requests
  allowDangerousTransactions: false,
  // Whether or not to enable the handling of EEP-7 Signing Requests
  allowSigningRequests: true,
  // The service URL used to subscribe to requests via Anchor Link sessions
  anchorLinkServiceUrl: 'cb.anchor.link',
  // The loaded authorization
  authorization: undefined,
  // The mode which Anchor operates in the background (macOS only)
  backgroundMode: 'both',
  // The enabled blockchains (array of chain ids)
  blockchains: [],
  // The block explorer used
  blockExplorer: 'bloks.io',
  // The block explorer to be used per chain
  blockExplorers: {},
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
  // Unique ID for this wallet
  deviceId: uuid(),
  // State to view by default in DevTest
  devTestDefaultState: false,
  // An API key for accessing a dfuse instance
  dfuseKey: '',
  // The JWT token for current dfuse usage
  dfuseAuthorization: undefined,
  // The JWT expiration timer
  dfuseAuthorizationExpires: undefined,
  // Defaults to displaying resources remaining
  displayResourcesAvailable: true,
  // Whether or not to display known testnets for the various networks
  displayTestNetworks: true,
  // Whether or not to establish sessions with apps
  enableSessions: true,
  // Default filter spam transfers to false
  filterSpamTransfersUnder: 0.0000,
  // If Greymass Fuel is enabled or not
  greymassFuel: false,
  // Default to Ledger import process
  hardwareLedgerImport: false,
  // Enable hardware support for Ledger devices
  hardwareLedgerSupport: false,
  // Default Idle Timeout
  idleTimeout: 999999999,
  // Default language
  lang: '',
  // The date the last backup was created
  lastBackupDate: false,
  // Set to true if any keys have been added or changed
  lastBackupInvalidated: true,
  // Last location a file was opened/saved from
  lastFilePath: '',
  // The node to connect to
  node: '',
  // Blockchains pinned to the menu bar
  pinnedBlockchains: [],
  // Whether or not the UI has prompted for enabling signing requests
  promptSigningRequests: true,
  // Whether the prompt will close upon completion or display a success message
  promptCloseOnComplete: true,
  // Whether the prompt will combine the sign + broadcast steps into a single click
  promptSignAndBroadcast: true,
  // Recent names that the wallet has bid on.
  recentBids: {},
  // Recent contracts/action combos the wallet has used
  recentContractActions: [],
  // Recent contracts the wallet has used
  recentContracts: [],
  // Recent referendum scopes the wallet has used
  recentProposalsScopes: [],
  // The most recently used wallets. Key is the chainId and property is the account/authority.
  recentWallets: {},
  // The interval which the wallet updates account data (in seconds, false = disabled)
  refreshRate: 15,
  // If the sidebar is collapsed
  sidebarCollapsed: false,
  // Allows the UI to start with only a connected node
  skipImport: false,
  // Allows users to go to link directly (without passing through DangerLink) when set to true
  skipLinkModal: false,
  // Window State Management
  setupData: {},
  // Window State Management
  signingWindowsetupData: {},
  // Whether or not to use Fuel-based Transaction Fees
  transactionFees: false,
  // Wallet Password Validity Hash
  walletHash: false,
  // Wallet Status
  walletInit: false,
  // Wallet Mode (hot/cold/watch/ledger)
  walletMode: false,
  // Wallet is Temporary
  walletTemp: false,
};

const validSettings = Object.keys(initialState);

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState, {
        deviceId: uuid()
      });
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
    case types.SET_RECENT_CONTRACT_ACTION: {
      const recentContractActions = (state.recentContractActions) ? [...state.recentContractActions] : [];
      const { contractName, actionName } = action.payload;
      const contractActionCombo = `${contractName}:${actionName}`;
      if (!recentContractActions.includes(contractActionCombo)) {
        recentContractActions.unshift(contractActionCombo);
      } else {
        recentContractActions.splice(recentContractActions.indexOf(contractActionCombo), 1);
        recentContractActions.unshift(contractActionCombo);
      }
      return Object.assign({}, state, {
        recentContractActions: recentContractActions.slice(0, 10)
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
    case types.SET_CURRENT_WALLET: {
      const wallet = {
        account: action.payload.account,
        authorization: action.payload.authorization,
        mode: action.payload.mode,
      };
      return Object.assign({}, state, {
        recentWallets: set(state.recentWallets, action.payload.chainId, wallet),
      });
    }
    case types.REMOVE_WALLET: {
      if (
        action.payload.account === state.account
        && action.payload.authorization === state.authorization
        && action.payload.chainId === state.chainId
      ) {
        return Object.assign({}, state, {
          account: '',
          authorization: undefined,
        });
      }
      return state;
    }
    case types.RESET_INVALID_SETTINGS: {
      return Object.assign({}, validSettings.reduce((o, setting) => ({
        ...o,
        [setting]: (state[setting] !== undefined) ? state[setting] : initialState[setting]
      }), {}));
    }
    case types.SET_CONNECTION_DFUSE_ENDPOINT: {
      return Object.assign({}, state, action.payload);
    }
    case types.SYSTEM_BLOCKCHAINS_PIN: {
      return Object.assign({}, state, {
        pinnedBlockchains: uniq([
          ...state.pinnedBlockchains || [],
          action.payload.chainId,
        ]),
      });
    }
    case types.SYSTEM_BLOCKCHAINS_UNPIN: {
      return Object.assign({}, state, {
        pinnedBlockchains: pull(state.pinnedBlockchains, action.payload.chainId),
      });
    }
    default: {
      return state;
    }
  }
}

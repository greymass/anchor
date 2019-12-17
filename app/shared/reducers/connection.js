import { find } from 'lodash';

import * as types from '../actions/types';

const initialState = {
  authorization: undefined,
  broadcast: true,
  chain: 'EOS',
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  chainKey: 'eos-mainnet',
  chainSymbol: 'EOS',
  expireSeconds: 120,
  // forceActionDataHex: false,
  historyPluginEnabled: true,
  httpEndpoint: null,
  keyPrefix: 'EOS',
  keyProvider: [],
  keyProviderObfuscated: {},
  sign: false,
  signMethod: false,
  signPath: false,
  supportedContracts: [],
  tokenPrecision: 4,
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case types.WALLET_REMOVE: {
      return Object.assign({}, state, {
        authorization: undefined,
        keyProvider: [],
        keyProviderObfuscated: {},
      });
    }
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SET_CHAIN_ID: {
      return Object.assign({}, state, {
        chainId: action.payload.chainId
      });
    }
    // Update httpEndpoint based on node validation/change
    case types.VALIDATE_NODE_FAILURE:
    case types.VALIDATE_NODE_SUCCESS: {
      const { blockchain, err, settings, useImmediately } = action.payload;
      const { account, authorization } = settings;
      // Prevent connection from changing if this was just a validation call
      if (!useImmediately) {
        return state;
      }
      return Object.assign({}, state, {
        authorization: [
          account,
          authorization || 'active',
        ].join('@'),
        chain: (blockchain && blockchain.name) || 'EOS Mainnet',
        chainId: (action.payload.info) ? action.payload.info.chain_id : settings.chainId,
        chainKey: (blockchain && blockchain._id) || 'eos-mainnet',
        chainSymbol: (blockchain && blockchain.symbol) || 'EOS',
        err,
        httpEndpoint: action.payload.node,
        keyPrefix: (blockchain && blockchain.keyPrefix) || 'EOS',
        supportedContracts: (blockchain) ? blockchain.supportedContracts : [],
        tokenPrecision: (blockchain && blockchain.tokenPrecision) || 4,
      });
    }
    // Remove key from connection if the wallet is locked/removed
    case types.WALLET_LOCK: {
      return Object.assign({}, state, {
        authorization: undefined,
        keyProvider: [],
        keyProviderObfuscated: {}
      });
    }
    case types.HARDWARE_LEDGER_TRANSPORT_SUCCESS: {
      return Object.assign({}, state, {
        signPath: action.payload.signPath,
      });
    }
    case types.SET_CONNECTION_BROADCAST: {
      return Object.assign({}, state, {
        broadcast: action.payload.enable
      });
    }
    case types.SET_CONNECTION_SIGN: {
      return Object.assign({}, state, {
        sign: action.payload.enable
      });
    }
    case types.SET_CONNECTION_HISTORY_PLUGIN_ENABLED: {
      return Object.assign({}, state, {
        historyPluginEnabled: action.payload.enabled
      });
    }
    case types.HARDWARE_LEDGER_TRANSPORT_FAILURE: {
      return Object.assign({}, state, {
        signPath: null,
      });
    }
    // Cold Wallet: increase expiration to 1hr, disable broadcast, enable sign
    case types.SET_WALLET_COLD: {
      return Object.assign({}, state, {
        broadcast: false,
        expireSeconds: 3600,
        sign: true,
        signMethod: false
      });
    }
    // Ledger Wallet: increase expiration to 1hr, disable broadcast/sign
    case types.SET_WALLET_LEDGER: {
      return Object.assign({}, state, {
        broadcast: true,
        expireSeconds: 3600,
        keyProvider: [],
        keyProviderObfuscated: {},
        sign: true,
        signMethod: 'ledger',
      });
    }
    // Watch Wallet: increase expiration to 1hr, enable broadcast, disable sign
    case types.SET_WALLET_WATCH: {
      return Object.assign({}, state, {
        broadcast: false,
        expireSeconds: 3600,
        keyProvider: [],
        keyProviderObfuscated: {},
        sign: false,
        signMethod: false
      });
    }
    // Hot Wallet: set expire to 2 minutes, enable broadcast, enable sign
    case types.SET_WALLET_HOT: {
      return Object.assign({}, state, {
        broadcast: true,
        expireSeconds: 120,
        signMethod: false
      });
    }
    // Set connection parameters related to the wallet
    case types.SET_CURRENT_WALLET: {
      return Object.assign({}, state, {
        authorization: [
          action.payload.account,
          action.payload.authorization || 'active',
        ].join('@'),
        chainId: action.payload.chainId || state.chainId,
        signPath: action.payload.path
      });
    }
    // Add key to connection if wallet is set or unlocked
    case types.SET_CURRENT_KEY:
    case types.SET_CURRENT_KEY_TEMPORARY: {
      return Object.assign({}, state, {
        authorization: [
          action.payload.account,
          action.payload.authorization || 'active',
        ].join('@'),
        chainId: action.payload.chainId || state.chainId,
        sign: true,
        keyProviderObfuscated: {
          hash: action.payload.hash,
          key: action.payload.key
        }
      });
    }
    // Update chainId on successful chain info request
    case types.GET_CHAIN_INFO_SUCCESS: {
      return Object.assign({}, state, {
        chainId: action.payload.chain.chain_id
      });
    }
    default: {
      return state;
    }
  }
}

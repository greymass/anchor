import { find } from 'lodash';

import * as types from '../actions/types';
import blockchains from '../constants/blockchains';

const initialState = {
  authorization: undefined,
  chain: 'eos-mainnet',
  broadcast: true,
  chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
  chainKey: 'eos-mainnet',
  chainSymbol: 'EOS',
  expireInSeconds: 120,
  // forceActionDataHex: false,
  httpEndpoint: null,
  keyPrefix: 'EOS',
  sign: false,
  signMethod: false,
  signPath: false,
  supportedContracts: []
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case types.WALLET_REMOVE:
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    // Update httpEndpoint based on node validation/change
    case types.VALIDATE_NODE_SUCCESS: {
      const blockchain = find(blockchains, { chainId: action.payload.info.chain_id });

      return Object.assign({}, state, {
        chain: (blockchain && blockchain.name) || 'unknown',
        chainId: action.payload.info.chain_id,
        chainKey: (blockchain && blockchain.key) || 'unknown',
        chainSymbol: (blockchain && blockchain.symbol) || 'EOS',
        httpEndpoint: action.payload.node,
        keyPrefix: (blockchain && blockchain.symbol) || 'EOS',
        supportedContracts: blockchain.supportedContracts
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
    case types.HARDWARE_LEDGER_TRANSPORT_FAILURE: {
      return Object.assign({}, state, {
        signPath: null,
      });
    }
    // Cold Wallet: increase expiration to 1hr, disable broadcast, enable sign
    case types.SET_WALLET_COLD: {
      return Object.assign({}, state, {
        broadcast: false,
        expireInSeconds: 3600,
        sign: true,
        signMethod: false
      });
    }
    // Ledger Wallet: increase expiration to 1hr, disable broadcast/sign
    case types.SET_WALLET_LEDGER: {
      return Object.assign({}, state, {
        broadcast: true,
        expireInSeconds: 3600,
        sign: true,
        signMethod: 'ledger',
      });
    }
    // Watch Wallet: increase expiration to 1hr, enable broadcast, disable sign
    case types.SET_WALLET_WATCH: {
      return Object.assign({}, state, {
        broadcast: false,
        expireInSeconds: 3600,
        sign: false,
        signMethod: false
      });
    }
    // Hot Wallet: set expire to 2 minutes, enable broadcast, enable sign
    case types.SET_WALLET_HOT: {
      return Object.assign({}, state, {
        broadcast: true,
        expireInSeconds: 120,
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

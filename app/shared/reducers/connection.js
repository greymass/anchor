import { find } from 'lodash';

import * as types from '../actions/types';

const DEFAULT_PUB_KEY_PREFIX = 'TLOS';

const initialState = {
  authorization: undefined,
  chain: null,
  chainId: null,
  broadcast: true,
  verbose: false,
  expireInSeconds: 120,
  forceActionDataHex: false,
  httpEndpoint: null,
  keyPrefix: DEFAULT_PUB_KEY_PREFIX
};

export default function connection(state = initialState, action) {
  switch (action.type) {
    case types.WALLET_REMOVE:
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    // Update httpEndpoint based on node validation/change
    case types.VALIDATE_NODE_SUCCESS: {
      const chain = action.payload.settings.blockchains.filter( (c) => {return c.chainId===action.payload.info.chain_id})[0];
      return Object.assign({}, state, {
        chain: chain ? chain.blockchain : 'unknown',
        chainId: action.payload.info.chain_id,
        keyPrefix: chain ? chain.prefix : DEFAULT_PUB_KEY_PREFIX,
        httpEndpoint: action.payload.node
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
    // Cold Wallet: increase expiration to 1hr, disable broadcast, enable sign
    case types.SET_WALLET_COLD: {
      return Object.assign({}, state, {
        broadcast: false,
        expireInSeconds: 3600,
        forceActionDataHex: false,
        sign: true
      });
    }
    // Watch Wallet: increase expiration to 1hr, enable broadcast, disable sign
    case types.SET_WALLET_WATCH: {
      return Object.assign({}, state, {
        broadcast: false,
        expireInSeconds: 3600,
        forceActionDataHex: false,
        sign: false
      });
    }
    // Hot Wallet: set expire to 2 minutes, enable broadcast, enable sign
    case types.SET_WALLET_HOT: {
      return Object.assign({}, state, {
        broadcast: true,
        expireInSeconds: 120,
        forceActionDataHex: true,
        sign: true
      });
    }
    // Add key to connection if wallet is set or unlocked
    case types.SET_WALLET_KEYS_ACTIVE:
    case types.SET_WALLET_KEYS_TEMPORARY: {
      return Object.assign({}, state, {
        authorization: undefined, // getAuthorization(action.payload.accountData, action.payload.pubkey),
        keyProviderObfuscated: {
          hash: action.payload.hash,
          key: action.payload.key
        }
      });
    }
    // Update chainId on successful chain info request
    case types.GET_CHAIN_INFO_SUCCESS: {
      const chain = action.payload.settings.blockchains.filter( (c) => {return c.chainId===action.payload.chain.chain_id})[0];
      return Object.assign({}, state, {
        chainId: action.payload.chain.chain_id,
        keyPrefix: chain ? chain.prefix : DEFAULT_PUB_KEY_PREFIX
      });
    }
    default: {
      return state;
    }
  }
}

function getAuthorization(account, pubkey) {
  if (account) {
    // Find the matching permission
    const permission = find(account.permissions, (perm) =>
      find(perm.required_auth.keys, (key) => key.key === pubkey));
    if (permission) {
      // Return an authorization for this key
      return {
        actor: account.account_name,
        permission: permission.perm_name
      };
    }
  }
  return undefined;
}

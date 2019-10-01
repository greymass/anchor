import { find, map, uniq } from 'lodash';

import { getAccounts, getCurrencyBalance } from './accounts';
import * as types from './types';
import * as chain from './chain';
import { getGlobals } from './globals';
import { getSupportedCalls } from './connection';

import eos from './helpers/eos';

const ecc = require('eosjs-ecc');

export function validateAccount(account) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.VALIDATE_ACCOUNT_PENDING });
    // Prevent private keys from submitting
    if (ecc.isValidPrivate(account) || (account.startsWith('5') && account.length === 51)) {
      return dispatch({
        type: types.VALIDATE_ACCOUNT_FAILURE,
      });
    }
    if (!account) {
      return dispatch({
        type: types.VALIDATE_ACCOUNT_FAILURE
      });
    }
    const {
      connection
    } = getState();
    try {
      // A generic info call to make sure it's working
      eos(connection).getAccount(account).then((results) => {
        // PATCH - Force in self_delegated_bandwidth if it doesn't exist
        const modified = results;
        if (!modified.self_delegated_bandwidth) {
          modified.self_delegated_bandwidth = {
            cpu_weight: 0,
            net_weight: 0
          };
        }
        // Dispatch the results of the account itself
        dispatch({
          type: types.GET_ACCOUNT_SUCCESS,
          payload: { results: modified }
        });
        // Fetch balances
        dispatch(getCurrencyBalance(account));
        // Return the validated success
        return dispatch({
          payload: { results: modified },
          type: types.VALIDATE_ACCOUNT_SUCCESS
        });
      }).catch((err) => dispatch({
        payload: { err },
        type: types.VALIDATE_ACCOUNT_FAILURE
      }));
    } catch (err) {
      return dispatch({
        payload: { err },
        type: types.VALIDATE_ACCOUNT_FAILURE
      });
    }
  };
}

export function validateNode(
  node,
  expectedChainId = false,
  saveAsDefault = false,
  useImmediately = false,
  refreshAllAccounts = false,
) {
  return (dispatch: () => void, getState) => {
    dispatch({
      node,
      type: types.VALIDATE_NODE_PENDING
    });
    // Ensure there's a value to test
    if (node || node.length !== 0) {
      const {
        blockchains,
        connection,
        settings,
        wallets,
      } = getState();

      let { host, protocol } = new URL(node);
      const { pathname } = new URL(node);

      // If the protocol contains the original value with a colon,
      // it means the protocol was missing and the protocol is the host.
      //
      // e.g. `api.example.com` instead of `http://api.example.com`
      if (`${protocol}${pathname}` === node) {
        host = node;
        protocol = 'http:';
      }
      const httpEndpoint = `${protocol}//${host}${pathname !== '/' ? pathname : ''}`;
      const expectedBlockchain = find(blockchains, { chainId: expectedChainId });
      // Establish EOS connection
      try {
        // Establish a modified state to test the connection against
        const modified = {
          ...connection,
          httpEndpoint
        };
        // A generic info call to make sure it's working
        eos(modified).getInfo({}).then(result => {
          // If we received a valid height, confirm this server can be connected to
          if (result.head_block_num > 1) {
            const blockchain = find(blockchains, { chainId: result.chain_id });
            if (expectedChainId && expectedChainId !== result.chain_id) {
              return dispatch({
                type: types.VALIDATE_NODE_FAILURE,
                payload: {
                  error: 'mismatch_chainid',
                  settings,
                }
              });
            }
            // Dispatch success
            dispatch({
              payload: {
                blockchain,
                info: result,
                node: httpEndpoint,
                saveAsDefault,
                settings,
                useImmediately,
              },
              type: types.VALIDATE_NODE_SUCCESS
            });
            // Check if the new node supports the History Plugin
            dispatch(getSupportedCalls());
            // Grab globals
            dispatch(getGlobals());
            setTimeout(() => {
              if (refreshAllAccounts) {
                // Filter wallet data down to the current chain
                const chainWallets = wallets.filter((w) => (w.chainId === blockchain.chainId));
                // Create a list of all account names loaded for this chain
                const chainAccounts = uniq(map(chainWallets, 'account'));
                // Refresh all of those accounts
                dispatch(getAccounts(chainAccounts));
              }
            }, 500);
            // Refresh our connection properties with new chain info
            return dispatch(chain.getInfo());
          }
          return dispatch({
            payload: {
              blockchain: expectedBlockchain,
              node: httpEndpoint,
              error: 'invalid_head_block',
              saveAsDefault,
              settings,
              useImmediately,
            },
            type: types.VALIDATE_NODE_FAILURE
          });
        }).catch((error) => dispatch({
          payload: {
            blockchain: expectedBlockchain,
            node: httpEndpoint,
            error,
            saveAsDefault,
            settings,
            useImmediately,
          },
          type: types.VALIDATE_NODE_FAILURE
        }));
      } catch (error) {
        return dispatch({
          payload: {
            blockchain: expectedBlockchain,
            error,
            node: httpEndpoint,
            saveAsDefault,
            settings,
            useImmediately,
          },
          type: types.VALIDATE_NODE_FAILURE
        });
      }
    }
  };
}

export function validateKey(key) {
  return async (dispatch: () => void, getState) => {
    dispatch({ type: types.VALIDATE_KEY_PENDING });
    const {
      accounts,
      connection,
      settings
    } = getState();
    if (!settings.account) {
      return dispatch({
        type: types.VALIDATE_KEY_FAILURE
      });
    }
    try {
      let account = accounts[settings.account];
      if (!account) {
        account = eos(connection).getAccount(settings.account);
      }
      // Keys must resolve to one of these types of permissions
      try {
        // Derive the public key from the private key provided
        const expect = ecc.privateToPublic(key, connection.keyPrefix);
        // Filter the account's permissions to find any valid matches
        const validPermissions = account.permissions.filter((perm) => {
          // Get the threshold a key needs to perform operations
          const { threshold } = perm.required_auth;
          // finally determine if any keys match
          const matches = perm.required_auth.keys.filter((auth) =>
            (auth.key === expect) && (auth.weight >= threshold));
          // this is a valid permission should any of the keys and thresholds match
          return (matches.length > 0);
        });
        // If the key matches any valid permission it's good
        if (validPermissions.length > 0) {
          dispatch({ type: types.VALIDATE_KEY_SUCCESS });
          return validPermissions[0].perm_name;
        }
      } catch (err) {
        // key is likely invalid, an exception was thrown
        return dispatch({
          payload: { err },
          type: types.VALIDATE_KEY_FAILURE
        });
      }
      return dispatch({ type: types.VALIDATE_KEY_FAILURE });
    } catch (err) {
      return dispatch({
        payload: { err },
        type: types.VALIDATE_KEY_FAILURE
      });
    }
  };
}

export function clearValidationState() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_VALIDATION_STATES
    });
  };
}

export default {
  clearValidationState,
  validateAccount,
  validateNode,
  validateKey
};

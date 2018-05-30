import * as types from './types';
import * as chain from './chain';
import eos from './helpers/eos';

const ecc = require('eosjs-ecc');

export function validateAccount(account) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.VALIDATE_ACCOUNT_PENDING });
    if (!account) {
      return dispatch({
        type: types.VALIDATE_ACCOUNT_FAILURE
      });
    }
    const {
      connection,
      settings
    } = getState();
    try {
      // A generic info call to make sure it's working
      eos(connection).getAccount(account).then((results) => {
        // Revalidate the key whenever the account is revalidated
        dispatch(validateKey(settings.key));
        return dispatch({
          payload: { results },
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

export function validateNode(node) {
  return (dispatch: () => void, getState) => {
    dispatch({
      node,
      type: types.VALIDATE_NODE_PENDING
    });
    // Ensure there's a value to test
    if (node || node.length !== 0) {
      // Establish EOS connection
      try {
        const {
          connection,
          settings
        } = getState();
        let { host, protocol, pathname } = new URL(node);
        // If the protocol contains the original value with a colon,
        // it means the protocol was missing and the protocol is the host.
        //
        // e.g. `api.example.com` instead of `http://api.example.com`
        if (`${protocol}${pathname}` === node) {
          host = node;
          protocol = 'http:';
        }
        const httpEndpoint = `${protocol}//${host}`;
        // Establish a modified state to test the connection against
        const modified = {
          ...connection,
          httpEndpoint
        };
        // A generic info call to make sure it's working
        eos(modified).getInfo({}).then(result => {
          // If we received a valid height, confirm this server can be connected to
          if (result.head_block_num > 1) {
            // Dispatch success
            dispatch({
              payload: { node: httpEndpoint },
              type: types.VALIDATE_NODE_SUCCESS
            });
            // Refresh our connection properties with new chain info
            dispatch(chain.getInfo());
            // Trigger revalidation on the current account
            return dispatch(validateAccount(settings.account));
          }
          return dispatch({ type: types.VALIDATE_NODE_FAILURE });
        }).catch((err) => dispatch({
          err,
          type: types.VALIDATE_NODE_FAILURE
        }));
      } catch (err) {
        return dispatch({
          err,
          type: types.VALIDATE_NODE_FAILURE
        });
      }
    }
  };
}

export function validateKey(key) {
  return (dispatch: () => void, getState) => {
    dispatch({ type: types.VALIDATE_KEY_PENDING });
    const {
      connection,
      settings
    } = getState();
    if (!settings.account) {
      return dispatch({
        type: types.VALIDATE_KEY_FAILURE
      });
    }
    try {
      // Establish EOS connection
      eos(connection).getAccount(settings.account).then((account) => {
        // Keys must resolve to one of these types of permissions
        const permissions = ['active', 'owner'];
        try {
          // Derive the public key from the private key provided
          const expect = ecc.privateToPublic(key);
          // Filter the account's permissions to find any valid matches
          const validPermissions = account.permissions.filter((perm) => {
            // Get the threshold a key needs to perform operations
            const { threshold } = perm.required_auth;
            // ensure the proper type of permission is provided by the auth
            if (permissions.indexOf(perm.perm_name) !== -1) {
              // finally determine if any keys match
              const matches = perm.required_auth.keys.filter((auth) =>
                (auth.key === expect) && (auth.weight >= threshold));
              // this is a valid permission should any of the keys and thresholds match
              return (matches.length > 0);
            }
            return false;
          });
          // If the key matches any valid permission it's good
          if (validPermissions.length > 0) {
            dispatch({ type: types.VALIDATE_KEY_SUCCESS });
            return true;
          }
        } catch (err) {
          // key is likely invalid, an exception was thrown
          console.log('invalid key', err);
          return dispatch({
            payload: { err },
            type: types.VALIDATE_KEY_FAILURE
          });
        }
        return dispatch({ type: types.VALIDATE_KEY_FAILURE });
      }).catch((err) => dispatch({
        payload: { err },
        type: types.VALIDATE_KEY_FAILURE
      }));
    } catch (err) {
      return dispatch({
        payload: { err },
        type: types.VALIDATE_KEY_FAILURE
      });
    }
  };
}

export function validateStake(stake, balance) {
  return (dispatch: () => void) => {
    dispatch({ type: types.VALIDATE_STAKE_PENDING });

    if ((stake.cpu_amount + stake.net_amount) > balance) {
      dispatch({
        payload: { error: 'not_enough_balance' },
        type: types.VALIDATE_STAKE_FAILURE
      });
      return false;
    }
    dispatch({
      type: types.VALIDATE_STAKE_SUCCESS
    });
    return true;
  };
}

export default {
  validateAccount,
  validateNode,
  validateKey,
  validateStake
};

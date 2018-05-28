import * as types from './types';

const Eos = require('eosjs');
const ecc = require('eosjs-ecc');

export function validateAccount(settings, account) {
  return (dispatch: () => void) => {
    dispatch({ type: types.VALIDATE_ACCOUNT_PENDING });
    const eos = Eos.Localnet({ httpEndpoint: settings.node });
    try {
      // A generic info call to make sure it's working
      eos.getAccount(account).then((results) => {
        // Revalidate the key whenever the account is revalidated
        dispatch(validateKey(settings, settings.key));
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

export function validateNode(settings, node) {
  return (dispatch: () => void) => {
    dispatch({ type: types.VALIDATE_NODE_PENDING });
    // Ensure there's a value to test
    if (node || node.length === 0) {
      // Establish EOS connection
      const eos = Eos.Localnet({ httpEndpoint: node });
      try {
        // A generic info call to make sure it's working
        eos.getInfo({}).then(result => {
          // If we received a valid height, confirm this server can be connected to
          if (result.head_block_num > 1) {
            dispatch(validateAccount(settings, settings.account));
            return dispatch({ type: types.VALIDATE_NODE_SUCCESS });
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

export function validateKey(settings, key) {
  return (dispatch: () => void) => {
    dispatch({ type: types.VALIDATE_KEY_PENDING });
    try {
      // Establish EOS connection
      const eos = Eos.Localnet({ httpEndpoint: settings.node });
      eos.getAccount(settings.account).then((account) => {
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
        payload: { error: 'You do not have enough balance.' },
        type: types.VALIDATE_STAKE_FAILURE
      });

      return false;
    }else{

      dispatch({
        type: types.VALIDATE_STAKE_SUCCESS
      });

      return true;
    }    
  };
}

export default {
  validateAccount,
  validateNode,
  validateKey,
  validateStake
};

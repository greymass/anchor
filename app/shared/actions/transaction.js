import { set } from 'dot-prop-immutable';

import * as types from './types';
import eos from './helpers/eos';

export function buildTransaction(contract, action, account, data) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    // Modify forceActionDataHex to allow for viewing of the action data
    const modified = set(connection, 'forceActionDataHex', false);
    // Reset system state to clear any previous transactions
    dispatch({
      type: types.RESET_SYSTEM_STATES
    });
    // Issue the pending transaction event
    dispatch({
      type: types.SYSTEM_TRANSACTION_BUILD_PENDING
    });
    // Build the operation to perform
    const op = {
      actions: [
        {
          account: contract.account,
          name: action,
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data
        }
      ]
    };
    eos(modified)
      .transaction(op, {
        broadcast: false,
        forceActionDataHex: false,
        sign: false
      })
      .then((tx) => {
        dispatch(setTransaction(JSON.stringify({
          contract,
          transaction: tx
        })));
        return dispatch({
          payload: { tx },
          type: types.SYSTEM_TRANSACTION_BUILD_SUCCESS
        });
      })
      .catch((err) => dispatch({
        payload: { err },
        type: types.SYSTEM_TRANSACTION_BUILD_FAILURE
      }));
  };
}

export function broadcastTransaction(tx, actionName = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    eos(connection)
      .pushTransaction(tx.transaction).then((response) => {
        if (actionName) {
          dispatch({
            payload: { tx: response },
            type: types[`SYSTEM_${actionName}_SUCCESS`]
          });
        }
        return dispatch({
          payload: { tx: response },
          type: types.SYSTEM_TRANSACTION_BROADCAST_SUCCESS
        });
      })
      .catch((err) => dispatch({
        payload: { err, tx },
        type: types.SYSTEM_TRANSACTION_BROADCAST_FAILURE
      }));
  };
}

export function cancelTransaction() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_TRANSACTION
    });
  };
}

export function clearTransaction() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_TRANSACTION
    });
  };
}

export function setTransaction(data) {
  return (dispatch: () => void) => {
    try {
      dispatch({
        type: types.SET_TRANSACTION,
        payload: JSON.parse(data)
      });
    } catch (err) {
      dispatch({
        type: types.SET_TRANSACTION_FAILURE,
        payload: { err, data }
      });
    }
  };
}

export function signTransaction(tx, contract = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    const signer = eos(connection, true);
    // If a contract was specified along with the transaction, load it.
    if (contract && contract.account && contract.abi) {
      signer.fc.abiCache.abi(contract.account, contract.abi);
    }
    // Sign the transaction
    signer
      .transaction(tx.transaction.transaction, {
        broadcast: connection.broadcast,
        expireInSeconds: connection.expireInSeconds,
        sign: connection.sign
      })
      .then((signed) => {
        if (signed.broadcast) {
          return dispatch({
            payload: { tx: signed },
            type: types.SYSTEM_TRANSACTION_BROADCAST_SUCCESS
          });
        }
        return dispatch(setTransaction(JSON.stringify({
          contract,
          transaction: signed
        })));
      })
      .catch((err) => dispatch({
        payload: { err, tx },
        type: types.SYSTEM_TRANSACTION_SIGN_FAILURE
      }));
  };
}

export default {
  buildTransaction,
  broadcastTransaction,
  clearTransaction,
  setTransaction,
  signTransaction
};

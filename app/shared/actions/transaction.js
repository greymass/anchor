import { Transaction } from '@greymass/eosio';

import * as types from './types';
import eos from './helpers/eos';

export function buildTransaction(contract, action, account, data) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings,
    } = getState();
    // Reset system state to clear any previous transactions
    dispatch({
      type: types.RESET_SYSTEM_STATES
    });
    // Issue the pending transaction event
    dispatch({
      type: types.SYSTEM_TRANSACTION_BUILD_PENDING
    });
    // Build the operation to perform
    eos(connection, true, true)
      // Specify Contract
      .transact({
        actions: [{
          account: contract.account,
          name: action,
          authorization: [{
            actor: settings.account,
            permission: settings.authorization
          }],
          data,
        }]
      }, {
        broadcast: false,
        sign: connection.sign
      })
      .then((tx) => {
        // Dispatch transaction
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

export function broadcastTransaction(tx, actionName = false, actionPayload = {}) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    const signer = eos(connection, false, true);
    const serializedTransaction = signer.api.serializeTransaction(tx.transaction.transaction);
    const { signatures } = tx.transaction;
    signer.rpc.push_transaction({ serializedTransaction, signatures })
      .then((response) => {
        if (actionName) {
          dispatch({
            payload: Object.assign({}, actionPayload, { tx: response }),
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
  const raw = JSON.parse(data);
  const abiDef = {
    contract: raw.contract.account,
    abi: raw.contract.abi,
  };
  let tx;
  try {
    tx = Transaction.from(raw.transaction.transaction.transaction, abiDef);
  } catch (e) {
    // watch wallet format from legacy
    tx = Transaction.from(raw.transaction.transaction.transaction.transaction, abiDef);
  }
  const decoded = JSON.parse(JSON.stringify(tx));
  decoded.actions.forEach((action, index) => {
    const decodedAction = tx.actions[index].decodeData(abiDef.abi);
    decoded.actions[index].data = JSON.parse(JSON.stringify(decodedAction));
  });
  return (dispatch: () => void) => {
    try {
      dispatch({
        type: types.SET_TRANSACTION,
        payload: {
          ...raw,
          transaction: tx,
          decoded,
        },
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
    const signer = eos(connection, true, true);
    // If a contract was specified along with the transaction, load it.
    if (contract && contract.account && contract.abi) {
      signer.setAbi(contract.account, {
        account_name: contract.account,
        abi: contract.abi
      });
    }
    // Sign the transaction
    signer
      .transact(tx.transaction.transaction, {
        broadcast: connection.broadcast,
        expireSeconds: connection.expireSeconds,
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

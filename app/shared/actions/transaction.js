import { Transaction } from '@greymass/eosio';

import * as types from './types';
import eos from './helpers/eos';

function buildTransaction(contract, action, account, data) {
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
          contracts: tx.contracts,
          transaction: tx.transaction
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

function broadcastTransaction(tx, actionName = false, actionPayload = {}) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    const signer = eos(connection, false, true);
    const plaintx = JSON.parse(JSON.stringify(tx.transaction.transaction));
    const serializedTransaction = signer.api.serializeTransaction(plaintx);
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

function cancelTransaction() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_TRANSACTION
    });
  };
}

function clearTransaction() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_TRANSACTION
    });
  };
}

function setTransaction(data) {
  const raw = JSON.parse(data);
  const abiDefs = [];
  if (raw.contract) {
    abiDefs.push({
      contract: raw.contract.account,
      abi: raw.contract.abi,
    });
  }
  if (raw.contracts) {
    raw.contracts.forEach((c) => abiDefs.push({
      contract: c.contract,
      abi: c.abi
    }));
  }
  let root;
  // This witchcraft needs to be tracked down and standardized with an interface
  if (raw.transaction) {
    root = raw.transaction;
  }
  if (raw.transaction && raw.transaction.transaction) {
    root = raw.transaction.transaction;
  }
  if (raw.transaction && raw.transaction.transaction && raw.transaction.transaction.transaction) {
    root = raw.transaction.transaction.transaction;
  }
  if (raw.transaction && raw.transaction.transaction && raw.transaction.transaction.transaction && raw.transaction.transaction.transaction.transaction) {
    root = raw.transaction.transaction.transaction.transaction;
  }

  const tx = Transaction.from(root, abiDefs);

  const decoded = JSON.parse(JSON.stringify(tx));
  decoded.actions.forEach((action, index) => {
    const [abiDef] = abiDefs.filter((def) => def.contract === action.account);
    if (abiDef) {
      const decodedAction = tx.actions[index].decodeData(abiDef.abi);
      decoded.actions[index].data = JSON.parse(JSON.stringify(decodedAction));
    }
  });
  return (dispatch: () => void) => {
    try {
      dispatch({
        type: types.SET_TRANSACTION,
        payload: {
          ...raw,
          transaction: {
            ...raw.transaction,
            transaction: {
              ...raw.transaction.transaction,
              transaction: tx
            },
          },
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

function signTransaction(tx, contracts = []) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    const signer = eos(connection, true, true);
    // If a contract was specified along with the transaction, load it.
    if (contracts && contracts.length) {
      contracts.forEach((contract) => {
        console.log(contract);
        signer.setAbi(contract.contract, {
          account_name: contract.contract,
          abi: contract.abi
        });
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
        const modified = Object.assign({}, signed);
        if (tx.transaction.signatures && tx.transaction.signatures.length) {
          // Merge signatures
          modified.transaction.signatures = [
            ...signed.transaction.signatures,
            ...tx.transaction.signatures
          ];
        }
        if (modified.broadcast) {
          return dispatch({
            payload: { tx: modified },
            type: types.SYSTEM_TRANSACTION_BROADCAST_SUCCESS
          });
        }
        return dispatch(setTransaction(JSON.stringify({
          contracts,
          transaction: modified
        })));
      })
      .catch((err) => dispatch({
        payload: { err, tx },
        type: types.SYSTEM_TRANSACTION_SIGN_FAILURE
      }));
  };
}

export {
  buildTransaction,
  broadcastTransaction,
  clearTransaction,
  setTransaction,
  signTransaction
};

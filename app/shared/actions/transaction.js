import * as types from './types';
import eos from './helpers/eos';

export function broadcastTransaction(tx) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    eos(connection)
      .pushTransaction(tx.transaction).then((response) =>
        dispatch({
          payload: { tx: response },
          type: types.SYSTEM_TRANSACTION_BROADCAST_SUCCESS
        }))
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

export function setTransaction(tx) {
  return (dispatch: () => void) => {
    try {
      dispatch({
        type: types.SET_TRANSACTION,
        payload: {
          transaction: JSON.parse(tx)
        }
      });
    } catch (err) {
      dispatch({
        type: types.SET_TRANSACTION_FAILURE,
        payload: { err, tx }
      });
    }
  };
}

export function signTransaction(tx) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    eos(connection, true)
      .transaction(tx.transaction.transaction, {
        broadcast: connection.broadcast,
        expireInSeconds: connection.expireInSeconds,
        sign: connection.sign
      })
      .then((signed) =>
        dispatch(setTransaction(JSON.stringify(signed))))
      .catch((err) => dispatch({
        payload: { err, tx },
        type: types.SIGN_TRANSACTION_FAILURE
      }));
  };
}

export default {
  clearTransaction,
  setTransaction,
  signTransaction
};

import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';

export function buyrex(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_BUYREX_PENDING
    });

    return eos(connection, true, true).transact({
      actions: [{
        account: 'eosio',
        name: 'buyrex',
        authorization: [{
          actor: settings.account,
          permission: settings.authorization,
        }],
        data: {
          from: settings.account,
          amount,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    }).then((result) => {
      return dispatch({
        payload: { connection },
        type: types.SYSTEM_BUYREX_SUCCESS
      });
    }).catch((err) => {
      return dispatch({
        payload: { connection, err },
        type: types.SYSTEM_BUYREX_FAILURE
      });
    });
  };
}

export function sellrex(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_SELLREX_PENDING
    });

    return eos(connection, true, true).transact({
      actions: [{
        account: 'eosio',
        name: 'sellrex',
        authorization: [{
          actor: settings.account,
          permission: settings.authorization,
        }],
        data: {
          from: settings.account,
          rex: amount,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    }).then((result) => {
      return dispatch({
        payload: { connection },
        type: types.SYSTEM_SELLREX_SUCCESS
      });
    }).catch((err) => {
      return dispatch({
        payload: { connection, err },
        type: types.SYSTEM_SELLREX_FAILURE
      });
    });
  };
}

export function depositrex(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_DEPOSITREX_PENDING
    });

    return eos(connection, true, true).transact({
      actions: [{
        account: 'eosio',
        name: 'deposit',
        authorization: [{
          actor: settings.account,
          permission: settings.authorization,
        }],
        data: {
          owner: settings.account,
          amount,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    }).then((result) => {
      return dispatch({
        payload: { connection },
        type: types.SYSTEM_DEPOSITREX_SUCCESS
      });
    }).catch((err) => {
      return dispatch({
        payload: { connection, err },
        type: types.SYSTEM_DEPOSITREX_FAILURE
      });
    });
  };
}

export function withdrawrex(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_WITHDRAWREX_PENDING
    });

    return eos(connection, true, true).transact({
      actions: [{
        account: 'eosio',
        name: 'withdraw',
        authorization: [{
          actor: settings.account,
          permission: settings.authorization,
        }],
        data: {
          owner: settings.account,
          amount,
        },
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    }).then((result) => {
      return dispatch({
        payload: { connection },
        type: types.SYSTEM_WITHDRAWREX_SUCCESS
      });
    }).catch((err) => {
      return dispatch({
        payload: { connection, err },
        type: types.SYSTEM_WITHDRAWREX_FAILURE
      });
    });
  };
}

export default {
  buyrex,
  sellrex,
  depositrex,
  withdrawrex,
};

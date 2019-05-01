import * as types from '../types';

import eos from '../helpers/eos';

export function buyrex(amount) {
  return (dispatch: () => void, getState) => {
    rexAction('buyrex', 'BUYREX', amount, dispatch, getState);
  };
}

export function sellrex(amount) {
  return (dispatch: () => void, getState) => {
    rexAction('sellrex', 'SELLREX', amount, dispatch, getState);
  };
}

export function depositrex(amount) {
  console.log({amount})
  return (dispatch: () => void, getState) => {
    rexAction('deposit', 'DEPOSITREX', amount, dispatch, getState);
  };
}

export function withdrawrex(amount) {
  return (dispatch: () => void, getState) => {
    rexAction('withdraw', 'WITHDRAWREX', amount, dispatch, getState);
  };
}

export function rentcpu(amount) {
  return (dispatch: () => void, getState) => {
    rexAction('rentCpu', 'RENTCPUREX', amount, dispatch, getState);
  };
}

export function rentnet(amount) {
  return (dispatch: () => void, getState) => {
    rexAction('rentNet', 'RENTNETREX', amount, dispatch, getState);
  };
}

function rexAction(actionName, actionVariable, amount, dispatch, getState) {
  const {
    settings,
    connection
  } = getState();

  dispatch({
    type: types[`SYSTEM_${actionVariable}_PENDING`]
  });

  return eos(connection, true, true).transact({
    actions: [{
      account: 'eosio',
      name: actionName,
      authorization: [{
        actor: settings.account,
        permission: settings.authorization,
      }],
      data: {
        owner: settings.account,
        amount
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  }).then(() => {
    return dispatch({
      payload: { connection },
      type: types[`SYSTEM_${actionVariable}_SUCCESS`]
    });
  }).catch((err) => {
    return dispatch({
      payload: { connection, err },
      type: types[`SYSTEM_${actionVariable}_FAILURE`]
    });
  });
}

export default {
  buyrex,
  depositrex,
  rentcpu,
  rentnet,
  sellrex,
  withdrawrex
};

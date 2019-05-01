import * as types from '../types';
import { getCurrencyBalance } from '../accounts';
import { getTableByBounds } from '../table';
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

  let accountField = 'owner';
  let amountField = 'amount';
  if (['BUYREX', 'SELLREX'].includes(actionVariable)) {
    accountField = 'from';
  }
  if (['SELLREX'].includes(actionVariable)) {
    amountField = 'rex';
  }
  return eos(connection, true, true).transact({
    actions: [{
      account: 'eosio',
      name: actionName,
      authorization: [{
        actor: settings.account,
        permission: settings.authorization,
      }],
      data: {
        [accountField]: settings.account,
        [amountField]: amount,
      },
    }]
  }, {
    blocksBehind: 3,
    expireSeconds: 30,
  }).then(() => {
    setTimeout(() => {
      dispatch(getCurrencyBalance(settings.account));
      dispatch(getTableByBounds('eosio', 'eosio', 'rexbal', settings.account, settings.account));
      dispatch(getTableByBounds('eosio', 'eosio', 'rexfund', settings.account, settings.accoun));
    }, 1000);
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

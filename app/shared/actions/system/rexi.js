import * as types from '../types';
import { getAccount, getCurrencyBalance } from '../accounts';
import { getTableByBounds } from '../table';
import eos from '../helpers/eos';

export function buyrex(amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      from: settings.account,
      amount
    };
    rexAction('buyrex', 'BUYREX', data, dispatch, getState);
  };
}

export function sellrex(amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      from: settings.account,
      rex: amount
    };
    rexAction('sellrex', 'SELLREX', data, dispatch, getState);
  };
}

export function depositrex(amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      owner: settings.account,
      amount
    };
    rexAction('deposit', 'DEPOSITREX', data, dispatch, getState);
  };
}

export function withdrawrex(amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      owner: settings.account,
      amount
    };
    rexAction('withdraw', 'WITHDRAWREX', data, dispatch, getState);
  };
}

export function rentcpu(amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      from: settings.account,
      loan_payment: amount,
      loan_fund: amount,
      receiver: settings.account,
    };
    rexAction('rentcpu', 'RENTCPUREX', data, dispatch, getState);
  };
}

export function rentnet(amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      from: settings.account,
      loan_payment: amount,
      loan_fund: amount,
      receiver: settings.account,
    };
    rexAction('rentnet', 'RENTNETREX', data, dispatch, getState);
  };
}

export function unstaketorex(amount, type) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    console.log({amount})
    const data = {
      owner: settings.account,
      receiver: settings.account,
      from_cpu: (type === 'cpu' && amount) || '0.0000 EOS',
      from_net: (type === 'net' && amount) || '0.0000 EOS',
    };
    rexAction('unstaketorex', 'UNSTAKETOREX', data, dispatch, getState);
  };
}

async function rexAction(actionName, actionVariable, data, dispatch, getState) {
  const {
    settings,
    connection
  } = getState();

  dispatch({
    type: types[`SYSTEM_${actionVariable}_PENDING`],
    payload: { connection }
  });

  // hack to get signing working on ledger - needs to be refactored
  const eosobj = eos(connection, true, true);
  let method = 'transact';
  let params = {
    blocksBehind: 3,
    expireSeconds: 30,
  };
  let contract;
  if (!eosobj[method]) {
    contract = await eosobj.getAbi('eosio');
    if (contract
      && contract.account_name
      && contract.abi
    ) {
      eosobj.fc.abiCache.abi(contract.account_name, contract.abi);
    }
    method = 'transaction';
    params = {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    };
  }

  return eosobj[method]({
    actions: [{
      account: 'eosio',
      name: actionName,
      authorization: [{
        actor: settings.account,
        permission: settings.authorization,
      }],
      data,
    }]
  }, params).then((tx) => {
    setTimeout(() => {
      dispatch(getAccount(settings.account));
      dispatch(getCurrencyBalance(settings.account));
      dispatch(getTableByBounds('eosio', 'eosio', 'rexbal', settings.account, settings.account));
      dispatch(getTableByBounds('eosio', 'eosio', 'rexfund', settings.account, settings.accoun));
    }, 1000);
    return dispatch({
      payload: {
        connection,
        contract,
        tx,
      },
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
  withdrawrex,
  unstaketorex,
};

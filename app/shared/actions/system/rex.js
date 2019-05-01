import * as types from '../types';
import { getAccount, getCurrencyBalance } from '../accounts';
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
    rexAction('rentcpu', 'RENTCPUREX', amount, dispatch, getState);
  };
}

export function rentnet(amount) {
  return (dispatch: () => void, getState) => {
    rexAction('rentnet', 'RENTNETREX', amount, dispatch, getState);
  };
}

async function rexAction(actionName, actionVariable, amount, dispatch, getState) {
  const {
    settings,
    connection
  } = getState();

  dispatch({
    type: types[`SYSTEM_${actionVariable}_PENDING`],
    payload: { connection }
  });

  let accountField = 'owner';
  let amountField = 'amount';
  if (['BUYREX', 'SELLREX', 'RENTCPUREX', 'RENTNETREX'].includes(actionVariable)) {
    accountField = 'from';
  }
  if (['SELLREX'].includes(actionVariable)) {
    amountField = 'rex';
  }
  if (['RENTCPUREX', 'RENTNETREX'].includes(actionVariable)) {
    amountField = 'loan_payment';
  }

  const data = {
    [accountField]: settings.account,
    [amountField]: amount,
  }
  if (['RENTCPUREX', 'RENTNETREX'].includes(actionVariable)) {
    data.receiver = settings.account;
    data.loan_fund = amount;
  }

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
  withdrawrex
};

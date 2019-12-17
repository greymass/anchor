import * as types from '../types';
import { getAccount, getCurrencyBalance } from '../accounts';
import { getTableByBounds } from '../table';
import { getCPULoans, getNETLoans } from '../rex';
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
    const { connection, settings } = getState();
    const data = {
      from: settings.account,
      loan_payment: amount,
      receiver: settings.account,
      loan_fund: `0.0000 ${connection.chainSymbol}`,
    };
    rexAction('rentcpu', 'RENTCPUREX', data, dispatch, getState);
  };
}

export function rentnet(amount) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const data = {
      from: settings.account,
      loan_payment: amount,
      receiver: settings.account,
      loan_fund: `0.0000 ${connection.chainSymbol}`,
    };
    rexAction('rentnet', 'RENTNETREX', data, dispatch, getState);
  };
}

export function unstaketorex(amount, type) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      owner: settings.account,
      receiver: settings.account,
      from_cpu: (type === 'cpu' && amount) || '0.0000 EOS',
      from_net: (type === 'net' && amount) || '0.0000 EOS',
    };
    rexAction('unstaketorex', 'UNSTAKETOREX', data, dispatch, getState);
  };
}

export function mvtosavings(amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      owner: settings.account,
      rex: amount,
    };
    rexAction('mvtosavings', 'MVTOSAVINGSREX', data, dispatch, getState);
  };
}

export function mvfrsavings(amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      owner: settings.account,
      rex: amount,
    };
    rexAction('mvfrsavings', 'MVFRSAVINGSREX', data, dispatch, getState);
  };
}
export function fundcpuloan(loanId, payment) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      from: settings.account,
      loan_num: loanId,
      payment,
    };
    rexAction('fundcpuloan', 'FUNDCPULOANREX', data, dispatch, getState);
  };
}

export function fundnetloan(loanId, payment) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      from: settings.account,
      loan_num: loanId,
      payment,
    };
    rexAction('fundnetloan', 'FUNDNETLOANREX', data, dispatch, getState);
  };
}

export function defundcpuloan(loanId, amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      from: settings.account,
      loan_num: loanId,
      amount,
    };
    rexAction('defcpuloan', 'DEFUNDCPULOANREX', data, dispatch, getState);
  };
}

export function defundnetloan(loanId, amount) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const data = {
      from: settings.account,
      loan_num: loanId,
      amount,
    };
    rexAction('defnetloan', 'DEFUNDNETLOANREX', data, dispatch, getState);
  };
}

async function rexAction(actionName, actionVariable, data, dispatch, getState) {
  const {
    settings,
    connection
  } = getState();

  const { account, authorization } = settings;

  dispatch({
    type: types[`SYSTEM_${actionVariable}_PENDING`],
    payload: { connection }
  });

  return eos(connection, true, true).transact({
    actions: [{
      account: 'eosio',
      name: actionName,
      authorization: [{
        actor: account,
        permission: authorization,
      }],
      data,
    }]
  }, {
    broadcast: connection.broadcast,
    expireSeconds: connection.expireSeconds,
    sign: connection.sign
  }).then((tx) => {
    setTimeout(() => {
      dispatch(getAccount(account));
      dispatch(getCurrencyBalance(account));
      dispatch(getTableByBounds('eosio', 'eosio', 'rexbal', account, account));
      dispatch(getTableByBounds('eosio', 'eosio', 'rexfund', account, account));
      dispatch(getCPULoans());
      dispatch(getNETLoans());
    }, 1000);
    return dispatch({
      payload: {
        connection,
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
  fundcpuloan,
  fundnetloan,
  defundcpuloan,
  defundnetloan,
  rentcpu,
  rentnet,
  sellrex,
  unstaketorex,
  mvtosavings,
  mvfrsavings,
  withdrawrex,
};

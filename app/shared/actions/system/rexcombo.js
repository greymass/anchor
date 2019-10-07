import * as types from '../types';
import { getAccount, getCurrencyBalance } from '../accounts';
import { getTableByBounds } from '../table';
import { getCPULoans, getNETLoans } from '../rex';
import eos from '../helpers/eos';

export function depositrentcpu(amount) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const data = {
      from: settings.account,
      loan_payment: amount,
      receiver: settings.account,
      loan_fund: `0.0000 ${connection.chainSymbol}`,
    };
    const deposit = {
      owner: settings.account,
      amount,
    };
    rexAction('rentcpu', 'RENTCPUREX', data, deposit, dispatch, getState);
  };
}

export function depositrentnet(amount) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const data = {
      from: settings.account,
      loan_payment: amount,
      receiver: settings.account,
      loan_fund: `0.0000 ${connection.chainSymbol}`,
    };
    const deposit = {
      owner: settings.account,
      amount,
    };
    rexAction('rentnet', 'RENTNETREX', data, deposit, dispatch, getState);
  };
}

async function rexAction(actionName, actionVariable, data, deposit, dispatch, getState) {
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
    actions: [
      {
        account: 'eosio',
        name: 'deposit',
        authorization: [{
          actor: settings.account,
          permission: settings.authorization,
        }],
        data: deposit,
      },
      {
        account: 'eosio',
        name: actionName,
        authorization: [{
          actor: settings.account,
          permission: settings.authorization,
        }],
        data,
      }
    ]
  }, params).then((tx) => {
    setTimeout(() => {
      dispatch(getAccount(settings.account));
      dispatch(getCurrencyBalance(settings.account));
      dispatch(getTableByBounds('eosio', 'eosio', 'rexbal', settings.account, settings.account));
      dispatch(getTableByBounds('eosio', 'eosio', 'rexfund', settings.account, settings.account));
      dispatch(getCPULoans());
      dispatch(getNETLoans());
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
    console.log(err)
    return dispatch({
      payload: { connection, err },
      type: types[`SYSTEM_${actionVariable}_FAILURE`]
    });
  });
}

export default {
  depositrentcpu,
  depositrentnet,
};

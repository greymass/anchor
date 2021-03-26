import { Asset } from '@greymass/eosio';

import * as types from '../types';
import { getAccount, getCurrencyBalance } from '../accounts';
import { getTableByBounds } from '../table';
import { getCPULoans, getNETLoans } from '../rex';
import eos from '../helpers/eos';

export function depositrentcpu(amount, rstate, usage) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const price = rstate.price_per(usage, amount * 1000);
    const asset = Asset.from(price, '4,EOS');
    const data = {
      from: settings.account,
      loan_payment: String(asset),
      receiver: settings.account,
      loan_fund: `0.0000 ${connection.chainSymbol}`,
    };
    const deposit = {
      owner: settings.account,
      amount: String(asset),
    };
    rexAction('rentcpu', 'RENTCPUREX', data, deposit, dispatch, getState);
  };
}

export function depositrentnet(amount, rstate, usage) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    const price = rstate.price_per(usage, amount * 1000);
    const asset = Asset.from(price, '4,EOS');
    const data = {
      from: settings.account,
      loan_payment: String(asset),
      receiver: settings.account,
      loan_fund: `0.0000 ${connection.chainSymbol}`,
    };
    const deposit = {
      owner: settings.account,
      amount: String(asset),
    };
    rexAction('rentnet', 'RENTNETREX', data, deposit, dispatch, getState);
  };
}

async function rexAction(actionName, actionVariable, data, deposit, dispatch, getState) {
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
    actions: [
      {
        account: 'eosio',
        name: 'deposit',
        authorization: [{
          actor: account,
          permission: authorization,
        }],
        data: deposit,
      },
      {
        account: 'eosio',
        name: actionName,
        authorization: [{
          actor: account,
          permission: authorization,
        }],
        data,
      }
    ]
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
  }).catch((err) => dispatch({
    payload: { connection, err },
    type: types[`SYSTEM_${actionVariable}_FAILURE`]
  }));
}

export default {
  depositrentcpu,
  depositrentnet,
};

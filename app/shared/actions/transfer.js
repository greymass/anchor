import * as types from './types';

import eos from './helpers/eos';
import { getCurrencyBalance } from './accounts';

function getAction(contractAccount, account, authorization, from, to, quantity, memo, network = 'EOS', connection = null, wallet = null) {
  const action = {
    account: contractAccount,
    name: 'transfer',
    authorization: [{
      actor: account,
      permission: authorization
    }],
    data: {
      from,
      to,
      quantity,
      memo
    }
  };
  // Modify transaction for FIO
  if (network === 'FIO') {
    const amount = parseInt(quantity.split(' ')[0] * 1000000000, 10);
    action.name = 'trnsfiopubky';
    action.data = {
      payee_public_key: to,
      amount,
      max_fee: 250000000,
      actor: account,
      tpid: null,
    };
  }
  return action;
}

export function transfer(from, to, quantity, memo, symbol) {
  return (dispatch: () => void, getState) => {
    const {
      balances,
      connection,
      settings,
      wallet
    } = getState();
    const { account, authorization } = settings;

    const currentSymbol = symbol || connection.chainSymbol || 'EOS';

    dispatch({
      payload: { connection },
      type: types.SYSTEM_TRANSFER_PENDING,
    });
    try {
      const contracts = balances.__contracts;
      const contractAccount = contracts[currentSymbol].contract;
      const actions = [getAction(contractAccount, account, authorization, from, to, quantity, memo, connection.keyPrefix, connection, wallet)];
      const signer = eos(connection, true, true)
      return signer.transact({ actions }, {
        broadcast: connection.broadcast,
        expireSeconds: connection.expireSeconds,
        sign: connection.sign
      }).then((tx) => {
        // If this is an offline transaction, also store the ABI
        if (!connection.sign && contractAccount !== 'eosio.token') {
          return eos(connection).getAbi(contractAccount).then((contract) =>
            dispatch({
              payload: {
                connection,
                contract,
                tx
              },
              type: types.SYSTEM_TRANSFER_SUCCESS
            }));
        }
        dispatch(getCurrencyBalance(from));
        return dispatch({
          payload: {
            connection,
            tx
          },
          type: types.SYSTEM_TRANSFER_SUCCESS
        });
      }).catch((err) => dispatch({
        payload: {
          connection,
          err
        },
        type: types.SYSTEM_TRANSFER_FAILURE
      }));
    } catch (err) {
      return dispatch({
        payload: {
          connection,
          err
        },
        type: types.SYSTEM_TRANSFER_FAILURE
      });
    }
  };
}

export default {
  transfer
};

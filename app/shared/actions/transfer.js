import * as types from './types';

import eos from './helpers/eos';
import { getCurrencyBalance } from './accounts';
import { httpClient } from '../utils/httpClient';

async function getAction(contractAccount, account, authorization, from, to, quantity, memo, network = 'EOS', connection = null, wallet = null) {
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
    const fees = await httpClient.post(`${connection.httpEndpoint}/v1/chain/get_fee`, {
      end_point: 'transfer_tokens_pub_key',
      fio_address: wallet.address,
    });
    const { fee } = fees.data;
    const amount = parseInt(quantity.split(' ')[0] * 1000000000, 10);
    action.name = 'trnsfiopubky';
    action.data = {
      payee_public_key: to,
      amount,
      max_fee: fee,
      actor: account,
      tpid: null,
    };
  }
  return action;
}

export function transfer(from, to, quantity, memo, symbol) {
  return async (dispatch: () => void, getState) => {
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
      const actions = [await getAction(contractAccount, account, authorization, from, to, quantity, memo, connection.keyPrefix, connection, wallet)];
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

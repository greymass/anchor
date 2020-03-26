import * as types from '../types';

import { getAccounts } from '../accounts';
import eos from '../helpers/eos';
import { httpClient } from '../../utils/httpClient';

async function getAction(connection, account, authorization, producers, proxy, network = 'EOS', wallet = null) {
  const action = {
    account: 'eosio',
    name: 'voteproducer',
    authorization: [
      {
        actor: account,
        permission: authorization,
      }
    ],
    data: {
      voter: account,
      proxy,
      producers,
    },
  };
  // Modify transaction for FIO
  if (network === 'FIO') {
    const fees = await httpClient.post(`${connection.httpEndpoint}/v1/chain/get_fee`, {
      end_point: 'vote_producer',
      fio_address: wallet.address,
    });
    const { fee } = fees.data;
    action.data = {
      actor: account,
      fio_address: wallet.address,
      producers,
      max_fee: fee
    };
  }
  return action;
}

export function voteproducers(producers = [], proxy = '') {
  return async (dispatch: () => void, getState) => {
    const {
      connection,
      settings,
      wallet,
    } = getState();
    dispatch({
      type: types.SYSTEM_VOTEPRODUCER_PENDING,
      payload: { connection }
    });
    const { account, authorization } = settings;
    // sort (required by EOS)
    producers.sort();
    const actions = [await getAction(connection, account, authorization, producers, proxy, connection.keyPrefix, wallet)];
    return eos(connection, true, true)
      .transact({ actions }, {
        blocksBehind: 3,
        broadcast: connection.broadcast,
        expireSeconds: connection.expireSeconds,
        sign: connection.sign,
      })
      // .voteproducer(account, proxy, producers)
      .then((tx) => {
        const accounts = [account];
        // If a proxy is set, that account also needs to be loaded
        if (proxy) {
          accounts.push(proxy);
        }
        // Add a short delay for data processing on the node
        setTimeout(() => {
          dispatch(getAccounts(accounts));
        }, 1000);
        return dispatch({
          payload: {
            connection,
            producers,
            proxy,
            tx,
          },
          type: types.SYSTEM_VOTEPRODUCER_SUCCESS
        });
      })
      .catch((err) => dispatch({
        payload: {
          connection,
          err,
          producers,
          proxy
        },
        type: types.SYSTEM_VOTEPRODUCER_FAILURE
      }));
  };
}

export default {
  voteproducers
};

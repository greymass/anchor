import * as types from '../types';

import { getAccounts } from '../accounts';
import eos from '../helpers/eos';

export function voteproducers(producers = [], proxy = '') {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    dispatch({
      type: types.SYSTEM_VOTEPRODUCER_PENDING,
      payload: { connection }
    });
    const { account, authorization } = settings;
    // sort (required by EOS)
    producers.sort();
    return eos(connection, true, true)
      .transact({
        actions: [{
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
        }]
      }, {
        blocksBehind: 3,
        broadcast: connection.broadcast,
        expireSeconds: 60,
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

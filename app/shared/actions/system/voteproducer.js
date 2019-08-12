import * as types from '../types';

import { getAccounts } from '../accounts';
import eos from '../helpers/eos';
import serializer from '../helpers/serializeBytes';
import checkForBeos from '../../components/helpers/checkCurrentBlockchain';

export function voteproducers(producers = [], proxy = '') {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings,
      jurisdictions
    } = getState();
    dispatch({
      type: types.SYSTEM_VOTEPRODUCER_PENDING,
      payload: { connection }
    });
    const { account } = settings;
    // sort (required by EOS)

    let serializedArray = [];
    if (checkForBeos(connection)) {
      const temp = jurisdictions.choosenJurisdictions.map(obj => obj.code);
      serializedArray = serializer.serialize(temp);
    }

    producers.sort();
    return eos(connection, true).transaction({
      actions: [{
        account: 'eosio',
        name: 'voteproducer',
        authorization: [{
          actor: account,
          permission: 'active'
        }],
        data: {
          voter: account,
          proxy,
          producers
        }
      }],
      transaction_extensions: serializedArray
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      const accounts = [account];
      // If a proxy is set, that account also needs to be loaded
      if (proxy) {
        accounts.push(proxy);
      }
      // Add a short delay for data processing on the node
      setTimeout(() => {
        dispatch(getAccounts(accounts));
      }, 500);
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

import { get, set } from 'dot-prop-immutable';

import * as types from '../types';
import eos from '../helpers/eos';
import { setSetting } from '../settings';
import { getBidForName } from '../namebids';

export function bidname(data) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_BIDNAME_PENDING
    });

    const { account, authorization } = settings;

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'bidname',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => {
      const currentRecentBids = get(settings, `recentBids.${settings.chainId}.${settings.account}`, []) || [];

      currentRecentBids.push({ newname: data.newname, bid: data.bid });

      const accountName = settings.account.replace('.', '\\.');
      const newRecentBidsState = set(settings.recentBids, `${settings.chainId}.${accountName}`, currentRecentBids);

      dispatch(setSetting('recentBids', newRecentBidsState));
      setTimeout(() => {
        dispatch(getBidForName(data.newname));
      }, 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_BIDNAME_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_BIDNAME_FAILURE
    }));
  };
}

export default {
  bidname
};

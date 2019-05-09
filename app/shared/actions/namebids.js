import { findIndex } from 'lodash';
import { get, set } from 'dot-prop-immutable';

import * as types from './types';
import eos from './helpers/eos';
import { setSetting } from './settings';

export function getBidForName(name) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_NAMEBID_PENDING
    });
    const { connection, settings } = getState();

    const query = {
      code: 'eosio',
      json: true,
      limit: 1,
      lower_bound: name,
      scope: 'eosio',
      table: 'namebids'
    };

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;
      const namebid = rows[0];
      const { recentBids } = settings;

      const currentBids = get(recentBids, `${settings.chainId}.${settings.account}`) || [];
      const bidIndex = findIndex(currentBids, { newname: namebid.newname });

      if (bidIndex > -1) {
        const account = settings.account.replace('.', '\\.');
        const newRecentBids = set(recentBids, `${settings.chainId}.${account}.${bidIndex}`, {
          newname: namebid.newname,
          bid: recentBids[settings.chainId][settings.account][bidIndex].bid,
          highestBid: `${(namebid.high_bid / 10000).toFixed(4)} EOS`
        });
        dispatch(setSetting('recentBids', newRecentBids));
      }

      return dispatch({
        type: types.SYSTEM_NAMEBID_SUCCESS,
        payload: {
          namebid
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_NAMEBID_FAILURE,
      payload: { err },
    }));
  };
}

export function getBidsForAccount(previous = false) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();
    let { recentBids } = settings;

    const query = {
      code: 'eosio',
      json: true,
      limit: 1000,
      scope: 'eosio',
      table: 'namebids'
    };

    if (previous) {
      query.lower_bound = previous;
    } else {
      dispatch({
        type: types.SYSTEM_NAMEBID_PENDING
      });
    }

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;

      rows.forEach((namebid) => {
        const currentBids = get(recentBids, `${settings.chainId}.${settings.account}`) || [];
        const bidIndex = findIndex(currentBids, { newname: namebid.newname });

        if (bidIndex === -1 && namebid.high_bidder === settings.account) {
          const account = settings.account.replace('.', '\\.');
          recentBids = set(recentBids, `${settings.chainId}.${account}`, currentBids.concat({
            newname: namebid.newname,
            highestBid: `${(namebid.high_bid / 10000).toFixed(4)} EOS`
          }));
        }
      });

      dispatch(setSetting('recentBids', recentBids));

      if (results.more) {
        // recurse
        const lastBid = rows[rows.length - 1];
        return dispatch(getBidsForAccount(lastBid && lastBid.newname ));
      } else {
        return dispatch({
          type: types.SYSTEM_NAMEBID_SUCCESS
        });
      }
    }).catch((err) => dispatch({
      type: types.SYSTEM_NAMEBID_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getBidForName,
  getBidsForAccount
};

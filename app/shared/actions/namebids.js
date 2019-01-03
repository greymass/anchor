import { findIndex } from 'lodash';
import { get } from 'dot-prop-immutable';

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

      const bidIndex = findIndex(get(recentBids, `${settings.chainId}.${settings.account}`) || [], { newname: namebid.newname });

      if (bidIndex > -1) {
        recentBids[settings.chainId][settings.account][bidIndex] =
          {
            newname: namebid.newname,
            bid: recentBids[settings.chainId][settings.account][bidIndex].bid,
            highestBid: `${namebid.high_bid / 10000} EOS`
          };

        dispatch(setSetting('recentBids', recentBids));
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
    dispatch({
      type: types.SYSTEM_NAMEBID_PENDING
    });
    const { connection, settings } = getState();
    const { recentBids } = settings;

    recentBids[settings.chainId][settings.account] = {};

    const query = {
      code: 'eosio',
      json: true,
      limit: 1000,
      scope: 'eosio',
      table: 'namebids'
    };

    if (previous) {
      query.lower_bound = previous - 1;
    }

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;
      rows.forEach((namebid) => {
        if (namebid.bidder === settings.account) {
          recentBids[settings.chainId][settings.account].concat({
            newname: namebid.newname,
            highestBid: `${namebid.high_bid / 10000} EOS`
          });

          dispatch(setSetting('recentBids', recentBids));
        }
      });
      if (results.more) {
        // recurse
        return dispatch(getBidsForAccount(previous ? previous + rows.length : rows.length ));
      }
      return dispatch({
        type: types.SYSTEM_NAMEBID_SUCCESS
      });
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

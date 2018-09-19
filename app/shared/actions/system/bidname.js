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

    const { account } = settings;

    return eos(connection, true).transaction({
      actions: [
        {
          account: 'eosio',
          name: 'bidname',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data
        }
      ]
    }).then((tx) => {
      const recentBids = (settings.recentBids && settings.recentBids) || {};

      recentBids[settings.account] =
        (recentBids[settings.account] || []).concat({ newname: data.newname, bid: data.bid });
      dispatch(setSetting('recentBids', recentBids));
      dispatch(getBidForName(data.newname));

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

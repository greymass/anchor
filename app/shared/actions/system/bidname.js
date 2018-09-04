import * as types from '../types';
import eos from '../helpers/eos';

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

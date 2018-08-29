import * as types from '../../types';

import { getTable } from '../../table';
import eos from '../../helpers/eos';

export function setregproxyinfo(data) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_SET_REGPROXYINFO_PENDING
    });

    const { account } = settings;

    return eos(connection, true).transaction({
      actions: [
        {
          account: 'regproxyinfo',
          name: 'set',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data
        }
      ]
    }).then((tx) => {
      setTimeout(dispatch(getTable('regproxyinfo', 'regproxyinfo', 'proxies')), 10000);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_SET_REGPROXYINFO_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_SET_REGPROXYINFO_SUCCESS
    }));
  };
}

export function unsetregproxyinfo() {
  return (dispatch: () => void, getState) => {
    const {
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_UNSET_REGPROXYINFO_PENDING
    });

    const { account } = settings;

    return eos.transaction({
      actions: [
        {
          account: 'regproxyinfo',
          name: 'unset',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            owner: account
          }
        }
      ]
    }).then((tx) => {
      setTimeout(dispatch(getTable('regproxyinfo', 'regproxyinfo', 'proxies')), 10000);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_UNSET_REGPROXYINFO_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UNSET_REGPROXYINFO_SUCCESS
    }));
  };
}

export default {
  setregproxyinfo,
  unsetregproxyinfo
};

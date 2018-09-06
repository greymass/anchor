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
      setTimeout(() => {
        dispatch(getTable('regproxyinfo', 'regproxyinfo', 'proxies'));
      }, 5000);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_SET_REGPROXYINFO_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_SET_REGPROXYINFO_FAILURE
    }));
  };
}

export function removeregproxyinfo() {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_REMOVE_REGPROXYINFO_PENDING
    });

    const { account } = settings;

    return eos(connection, true).transaction({
      actions: [
        {
          account: 'regproxyinfo',
          name: 'remove',
          authorization: [{
            actor: account,
            permission: 'active'
          }],
          data: {
            proxy: account
          }
        }
      ]
    }).then((tx) => dispatch({
      payload: { tx },
      type: types.SYSTEM_REMOVE_REGPROXYINFO_SUCCESS
    })).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REMOVE_REGPROXYINFO_FAILURE
    }));
  };
}

export default {
  removeregproxyinfo,
  setregproxyinfo
};

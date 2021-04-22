import { get } from 'dot-prop-immutable';

import * as types from './types';

interface PendingAccountCreate {
  account: string,
  active: string,
  chainId: string,
  created: number,
  owner: string,
  permission: string,
  request: string
}

export function addPendingAccountCreate(payload: PendingAccountCreate) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_PENDING_ACCOUNT_CREATE,
      payload
    });
  };
}

export function removePendingAccountCreate(payload: PendingAccountCreate) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_PENDING_ACCOUNT_REMOVE,
      payload
    });
  };
}

export default {
  addPendingAccountCreate,
  removePendingAccountCreate,
};

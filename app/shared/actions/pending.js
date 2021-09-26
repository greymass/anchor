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

interface PendingAccountCertificate {
  chainId: string,
  account: string,
  active: string,
  owner: string
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


export function addPendingAccountCertificate(payload: PendingAccountCertificate) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_PENDING_ACCOUNT_CERTIFICATE_CREATE,
      payload
    });
  };
}

export function removePendingAccountCertificate(payload: PendingAccountCertificate) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_PENDING_ACCOUNT_CERTIFICATE_REMOVE,
      payload
    });
  };
}

export default {
  addPendingAccountCreate,
  addPendingAccountCertificate,
  removePendingAccountCreate,
  removePendingAccountCertificate
};

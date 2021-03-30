import { SigningRequest } from 'eosio-signing-request';
import { Signature, Transaction } from '@greymass/eosio';

import * as types from './types';

import { httpQueue, httpClient } from '../utils/http/generic';

const host = 'https://eos.greymass.com';
const { ipcRenderer } = require('electron');

// import eos from './helpers/eos';

export function retryWithFee(actionType, request) {
  return async (dispatch: () => void, getState) => {
    const { settings } = getState();
    dispatch({
      type: `SYSTEM_${actionType.requestName}_PENDING`
    });
    const tx = Transaction.from(request.data.request[1]);
    const payload = await SigningRequest.create({
      chainId: settings.chainId,
      transaction: tx
    });
    payload.setInfoKey('onSuccess', `SYSTEM_${actionType.requestName}_SUCCESS`);
    payload.setInfoKey('cosig', request.data.signatures, { type: Signature, array: true });
    ipcRenderer.send('openUri', payload.encode());
  };
}

export function getFuelQuotaStatus(account = null) {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    const used = account || settings.account;
    dispatch({
      type: types.SYSTEM_FUELQUOTASTATUS_PENDING,
      payload: {
        account: used
      }
    });
    httpQueue.add(() =>
      httpClient
        .post(`${host}/v1/fuel/get_quota_usage`, {
          account: used
        })
        .then((response) => dispatch({
          type: types.SYSTEM_FUELQUOTASTATUS_SUCCESS,
          payload: {
            response,
          }
        }))
        .catch((error) => dispatch({
          type: types.SYSTEM_FUELQUOTASTATUS_FAILURE,
          payload: {
            host,
            error
          }
        })));
  };
}


export default {
  getFuelQuotaStatus,
  retryWithFee
};

import { SigningRequest } from 'eosio-signing-request';
import { Signature, Transaction } from '@greymass/eosio';

import * as types from './types';

import { httpQueue, httpClient } from '../utils/http/generic';

const host = 'https://eos.greymass.com';
const { ipcRenderer } = require('electron');

// import eos from './helpers/eos';

function retryWithFee(actionType, request) {
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
    // Add the fee itself to the payload
    payload.setInfoKey('txfee', request.data.fee);
    // If the fee costs exist, set them on the request for the prompt to display
    if (request.data.costs) {
      payload.setInfoKey('txfeecpu', request.data.costs.cpu);
      payload.setInfoKey('txfeenet', request.data.costs.net);
      payload.setInfoKey('txfeeram', request.data.costs.ram);
    }
    ipcRenderer.send('openUri', payload.encode());
  };
}

function getFuelQuotaStatus(account = null) {
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


export {
  getFuelQuotaStatus,
  retryWithFee
};

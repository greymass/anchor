import * as types from './types';

import { httpQueue, httpClient } from '../utils/httpClient';

const host = 'https://eos.greymass.com'

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
  getFuelQuotaStatus
};

import * as types from './types';
import eos from './helpers/eos';
import { httpQueue, httpClient } from '../utils/httpClient';

export function downloadProgress(progress) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.APP_UPDATE_DOWNLOAD_PROGRESS,
      payload: progress
    });
  };
}

export const initApp = () => (dispatch: () => void) => dispatch({
  type: types.APP_INIT
});

export function getConstants() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_GETCONSTANTS_PENDING
    });

    const query = {
      json: true,
      code: 'anchorwallet',
      scope: 'anchorwallet',
      table: 'constants',
      limit: 1000,
    };

    httpQueue.add(() =>
      httpClient
        .post('https://eos.greymass.com/v1/chain/get_table_rows', query)
        .then((response) => {
          const { rows } = response.data;
          const data = rows.reduce((map, { key, value }) => {
            let parsed = value;
            try {
              parsed = JSON.parse(value);
            } catch (e) {
              // no catch
            }
            return {
              ...map,
              [key]: parsed
            };
          }, {});
          return dispatch({
            type: types.SYSTEM_GETCONSTANTS_SUCCESS,
            payload: { data }
          });
        })
        .catch((err) => dispatch({
          type: types.SYSTEM_GETCONSTANTS_FAILURE,
          payload: { err },
        })));
  };
}

export default {
  downloadProgress,
  getConstants,
  initApp
};

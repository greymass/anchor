import * as types from './types';
import eos from './helpers/eos';
import { httpClient, httpQueue } from '../utils/http/generic';
import { find } from 'lodash';

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
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETCONSTANTS_PENDING
    });

    // To ensure this works with wallets that haven't configured EOS, specify a default
    let api = 'https://eos.greymass.com';

    // Find the blockchain configuration for EOS
    const { blockchains } = getState();
    const blockchain = find(blockchains, { chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906' });

    // If the blockchain exists, and a node is specified, use that node for this call
    if (blockchain && blockchain.node) {
      api = blockchain.node;
    }

    // The query to perform to load the anchorwallet contract
    const query = {
      json: true,
      code: 'anchorwallet',
      scope: 'anchorwallet',
      table: 'constants',
      limit: 1000,
    };

    httpQueue.add(() =>
      httpClient
        .post(`${api}/v1/chain/get_table_rows`, query)
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

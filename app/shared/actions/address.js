import * as types from './types';

import { httpClient } from '../utils/httpClient';

export function lookupFioNames(wallet) {
  return async (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    const response = await httpClient.post(`${connection.httpEndpoint}/v1/chain/get_fio_names`, {
      fio_public_key: wallet.pubkey
    });
    if (
      response
      && response.data
      && response.data.fio_addresses
      && response.data.fio_addresses.length > 0
    ) {
      dispatch({
        type: types.SET_CURRENT_WALLET_ADDRESS,
        payload: {
          account: wallet.account,
          address: response.data.fio_addresses[0].fio_address,
          authorization: wallet.authorization,
          chainId: wallet.chainId,
        }
      });
    }
  };
}

export default {
  lookupFioNames,
};

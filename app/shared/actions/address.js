import * as types from './types';

import { createHttpHandler } from '../utils/http/handler';

function lookupFioNames(wallet) {
  return async (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    const { httpClient } = await createHttpHandler(connection);
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

export {
  lookupFioNames,
};

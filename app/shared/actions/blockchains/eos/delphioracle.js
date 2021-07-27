import * as types from '../../types';
import eos from '../../helpers/eos';

const defaultContract = 'delphioracle';

export function getPriceFeed(chainId = 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906') {
  let scope = 'eosusd';
  switch (chainId) {
    case '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4': {
      scope = 'waxpusd';
      break;
    }
    default: {
      break;
    }
  }
  return (dispatch: () => void, getState) => {
    const { connection } = getState();
    if (!connection || !connection.supportedContracts || !connection.supportedContracts.includes('delphioracle')) {
      return;
    }
    dispatch({
      type: types.SYSTEM_PRICEFEEDUSD_PENDING
    });
    const query = {
      json: true,
      code: defaultContract,
      scope,
      table: 'datapoints',
      limit: 1,
    };

    if (!connection.httpEndpoint) {
      return;
    }

    eos(connection, false, true).rpc.get_table_rows(query).then((results) => dispatch({
      type: types.SYSTEM_PRICEFEEDUSD_SUCCESS,
      payload: {
        results,
        scope,
      }
    })).catch((err) => dispatch({
      type: types.SYSTEM_PRICEFEEDUSD_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getPriceFeed,
};

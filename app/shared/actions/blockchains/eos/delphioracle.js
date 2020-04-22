import * as types from '../../types';
import eos from '../../helpers/eos';

const defaultContract = 'delphioracle';

export function getPriceFeed(scope = 'eosusd') {
  return (dispatch: () => void, getState) => {
    const { connection } = getState();
    if (!connection.supportedContracts.includes('delphioracle')) {
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

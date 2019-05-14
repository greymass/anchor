import * as types from '../../types';
import eos from '../../helpers/eos';

const defaultContract = 'delphioracle';

export function getPriceFeed(scope = 'delphioracle') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_PRICEFEEDUSD_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: defaultContract,
      scope,
      table: 'eosusd',
      limit: 1,
    };

    if (!connection.httpEndpoint) {
      return;
    }

    eos(connection).getTableRows(query).then((results) => dispatch({
      type: types.SYSTEM_PRICEFEEDUSD_SUCCESS,
      payload: {
        results
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

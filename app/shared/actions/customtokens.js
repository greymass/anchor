import concat from 'lodash/concat';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import uniqWith from 'lodash/uniqWith';

import * as types from './types';
import eos from './helpers/eos';

export function getCustomTokens(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_CUSTOMTOKENS_PENDING
    });
    const { connection } = getState();
    // Don't retrieve if we're not on mainnet
    if (!connection.supportedContracts ||
        !connection.supportedContracts.includes('customtokens')) {
      return dispatch({
        type: types.SYSTEM_CUSTOMTOKENS_FAILURE
      });
    }

    const query = {
      json: true,
      code: 'customtokens',
      scope: 'customtokens',
      table: 'tokens',
      limit: 1000,
    };
    if (previous) {
      query.lower_bound = previous[previous.length - 1].owner;
    }
    eos(connection, false, true).rpc.get_table_rows(query).then((results) => {
      let { rows } = results;
      // If previous rows were returned
      if (previous) {
        // slice last element to avoid dupes
        previous.pop();
        // merge arrays
        rows = concat(previous, rows);
      }
      // if there are missing results
      if (results.more) {
        return dispatch(getCustomTokens(rows));
      }
      const data = rows
        .map((token) => {
          const [value, symbol] = token.customasset.split(' ');
          const [, suffix] = value.split('.');
          const precision = (suffix) ? suffix.length : 0;
          const contract = token.customtoken;
          return {
            contract,
            precision,
            symbol
          };
        });
      const list = sortBy(data, 'symbol');
      const tokens = uniqWith(list, isEqual);
      return dispatch({
        type: types.SYSTEM_CUSTOMTOKENS_SUCCESS,
        payload: {
          tokens,
          chainId: connection.chainId
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_CUSTOMTOKENS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getCustomTokens
};

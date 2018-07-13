import sortBy from 'lodash/sortBy';

import * as types from './types';
import eos from './helpers/eos';

export function getBlockExplorers() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_PENDING
    });
    // const { connection } = getState();
    // const query = {
    //   json: true,
    //   code: 'blockexplorers',
    //   scope: 'blockexplorers',
    //   table: 'blockexplorers',
    //   limit: 100,
    // };

    const rows = [
      {
        name: 'bloks.io',
        patterns: {
          account: 'https://www.bloks.io/account/{account}',
          tx: 'https://www.bloks.io/transaction/{txid}'
        }
      },
      {
        name: 'eospark.com',
        patterns: {
          account: 'https://eospark.com/MainNet/account/{account}',
          block: '',
          tx: 'https://eospark.com/MainNet/tx/{txid}'
        }
      }
    ];

    // eos(connection).getTableRows(query).then((results) => {
    //   const { rows } = results;

    const sortedList = sortBy(rows, 'name');

    const blockExplorers = {};

    sortedList.forEach((bE) => {
      blockExplorers[bE.name] = bE.patterns;
    });

    return dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_SUCCESS,
      payload: {
        blockExplorers
      }
    });
    // }).catch((err) => dispatch({
    //   type: types.SYSTEM_BLOCKEXPLORERS_FAILURE,
    //   payload: { err },
    // }));
  };
}

export default {
  getBlockExplorers
};

import * as types from './types';
import sortBy from 'lodash/sortBy';

import eos from './helpers/eos';

export function clearProducerCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_PRODUCER_CACHE
    });
  };
}

export function getProducers() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_PRODUCERS_REQUEST
    });
    const { connection } = getState();
    eos(connection).getTableRows({
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'producers',
      limit: 1000
    }).then((results) => {
      const { globals } = getState();
      const { current } = globals;
      let backupMinimumPercent = false;
      let tokensToProducersForVotes = false;
      if (globals && globals.eos) {
        const supply = parseFloat(globals.eos.supply);
        // yearly inflation
        const inflation = 0.04879;
        // Tokens per year
        const tokensPerYear = supply * inflation;
        // Tokens per day
        const tokensPerDay = tokensPerYear / 365;
        // 1/5th of inflation
        const tokensToProducers = tokensPerDay * 0.2;
        // 75% rewards based on votes
        tokensToProducersForVotes = tokensToProducers * 0.75;
        // Percentage required to earn 100 tokens/day (break point for backups)
        backupMinimumPercent = 100 / tokensToProducersForVotes;
      }
      const data = results.rows.map((producer) => {
        const votes = parseInt(producer.total_votes, 10);
        const percent = votes / current.total_producer_vote_weight;
        const isBackup = (backupMinimumPercent && percent > backupMinimumPercent);
        return Object.assign({}, {
          isBackup,
          key: `${producer.owner}-${producer.last_produced_block_time}`,
          last_produced_block_time: producer.last_produced_block_time,
          owner: producer.owner,
          percent,
          url: producer.url,
          votes
        });
      });
      const list = sortBy(data, 'votes').reverse();
      return dispatch({
        type: types.GET_PRODUCERS_SUCCESS,
        payload: {
          list
        }
      });
    }).catch((err) => dispatch({
      type: types.GET_PRODUCERS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getProducers
};

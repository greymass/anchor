import { concat, intersection, sortBy } from 'lodash';
import { get } from 'dot-prop-immutable';

import eos from './helpers/eos';
import * as types from './types';

export function clearProducerCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_PRODUCER_CACHE
    });
  };
}

export function clearProducerInfo() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_PRODUCERJSON_CLEAR
    });
  };
}

export function getProducers(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_PRODUCERS_REQUEST
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'producers',
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
        // recurse
        return dispatch(getProducers(rows));
      }
      const { globals } = getState();
      const { current } = globals;
      let backupMinimumPercent = false;
      let tokensToProducersForVotes = false;
      const { contract } = globals;
      if (contract && contract['eosio.token'] && contract['eosio.token'][connection.chainSymbol]) {
        const supply = parseFloat(contract['eosio.token'][connection.chainSymbol].supply);
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
      const data = rows
        .filter((p) => (p.producer_key !== 'EOS1111111111111111111111111111111114T1Anm'))
        .map((producer) => {
          const votes = parseInt(producer.total_votes, 10);
          const percent = votes / parseInt(current.total_producer_vote_weight, 10);
          const isBackup = (backupMinimumPercent && percent > backupMinimumPercent);
          const tokenPrecision = connection.votePrecision || connection.tokenPrecision || 4;
          const voteWeightMultiple = 10 ** tokenPrecision;
          const tokenVotes = connection.voteDecay === false
            ? (votes / voteWeightMultiple).toFixed(0)
            : (votes / calcVoteWeight(connection.voteDecayPeriod) / voteWeightMultiple).toFixed(0);
          const { owner } = producer;
          let address;
          switch (connection.keyPrefix) {
            case 'FIO': {
              address = producer.fio_address;
              break;
            }
            default: {
              // no default
            }
          }

          return Object.assign({}, {
            address,
            isBackup,
            key: `${producer.owner}-${producer.total_votes}`,
            last_produced_block_time: producer.last_produced_block_time,
            owner,
            percent,
            tokenVotes,
            producer_key: producer.producer_key,
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

function calcVoteWeight(voteDecayPeriod) {
  const timestamp = 946684800000;
  const dates = (Date.now() / 1000) - (timestamp / 1000);
  const weight = Math.floor(dates / (86400 * 7)) / (voteDecayPeriod || 52);
  return 2 ** weight;
}

export function getProducersInfo(previous = false) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_PRODUCERSJSON_PENDING
    });
    const { connection } = getState();
    // Don't retrieve if we're not on mainnet
    if (connection.chainKey && connection.chainKey.toLowerCase().indexOf('mainnet') === -1) return;
    const query = {
      json: true,
      code: 'producerjson',
      scope: 'producerjson',
      table: 'producerjson',
      limit: 1000
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
        // recurse
        return dispatch(getProducersInfo(rows));
      }
      return dispatch({
        type: types.SYSTEM_PRODUCERSJSON_SUCCESS,
        payload: {
          rows
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_PRODUCERSJSON_FAILURE,
      payload: { err },
    }));
  };
}

export function setUnregisteredProducers() {
  return (dispatch: () => void, getState) => {
    const { accounts, producers, settings } = getState();
    const { list } = producers;
    const voterInfo = get(accounts, `${settings.account}.voter_info`);
    if (!voterInfo) {
      return dispatch({
        type: types.SET_UNREGISTERED_PRODUCERS,
        payload: { unregisteredProducers: [] }
      });
    }
    const selected = get(voterInfo, 'producers', []);
    const unregisteredProducers = [];
    const availableProducers = list.map((producer) => producer.owner);
    const validSelected = intersection(availableProducers, selected);
    selected.forEach((producer) => {
      if (!validSelected.includes(producer)) {
        unregisteredProducers.push(producer);
      }
    });

    return dispatch({
      type: types.SET_UNREGISTERED_PRODUCERS,
      payload: { unregisteredProducers }
    });
  };
}

export function getProducerInfo(producer) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_PRODUCERJSON_PENDING,
      payload: { producer }
    });
    const { connection } = getState();
    // Don't retrieve if we're not on mainnet
    if (connection.chainKey && connection.chainKey.toLowerCase().indexOf('mainnet') === -1) return;
    const query = {
      json: true,
      code: 'producerjson',
      scope: 'producerjson',
      table: 'producerjson',
      limit: 1,
      table_key: 'owner',
      lower_bound: producer
    };
    eos(connection, false, true).rpc.get_table_rows(query).then((results) => {
      const result = results.rows[0];
      if (result.owner !== producer) {
        return dispatch({
          type: types.SYSTEM_PRODUCERJSON_FAILURE,
          payload: { err: 'producer_not_available', producer },
        });
      }
      return dispatch({
        type: types.SYSTEM_PRODUCERJSON_SUCCESS,
        payload: {
          producer,
          json: JSON.parse(result.json)
        }
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_PRODUCERJSON_FAILURE,
      payload: { err, producer },
    }));
  };
}

export default {
  clearProducerInfo,
  getProducerInfo,
  getProducers,
  getProducersInfo,
  setUnregisteredProducers
};

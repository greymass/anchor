import { partition } from 'lodash';

import * as types from '../../actions/types';

const initialState = {
  data: {},
  error: false,
  endpoints: [],
  estimated: 0,
  loading: {},
  path: '/v1/history/get_actions',
  pending: 0,
  producer: 'Unknown',
  results: [],
  maxSequence: 0,
};

function splitResultsByHost(host, results) {
  const [, others] = partition(results, { host });
  let [[current]] = partition(results, { host });
  if (!current) {
    current = {
      attempt: 0,
      available: false,
      failed: false,
      failing: false,
      failure: 0,
      history: [],
      host,
      ms: 999999,
      response: false,
      seq: 0,
      success: 0,
    };
  }
  return {
    current: Object.assign({}, current),
    others: [...others]
  };
}

export default function ping(state = initialState, action) {
  switch (action.type) {
    case types.UTILS_PING_NODE_RESET: {
      return Object.assign({}, initialState);
    }
    case types.UTILS_PING_NODE_PENDING: {
      const {
        data,
        host,
        path,
        producer,
      } = action.payload;
      const { current, others } = splitResultsByHost(host, state.results);
      current.attempt += 1;
      current.loading = true;
      current.failed = false;
      current.producer = producer;
      return Object.assign({}, state, {
        data,
        path,
        pending: state.pending + 1,
        results: [current, ...others]
      });
    }
    case types.UTILS_PING_NODE_SUCCESS: {
      const {
        app,
        data,
        host,
        path,
        producer,
        response,
      } = action.payload;
      const { current, others } = splitResultsByHost(host, state.results);
      let newMaxSequence = state.maxSequence;
      // Tell the UI it's no longer loading
      current.loading = false;
      // Set the last request as not failed
      current.failed = false;
      // Determine if this endpoint uses a proxy
      const { knownproxies } = app.constants;
      current.proxy = response.headers['x-selected-node'] || knownproxies[host] || false;
      current.producer = producer;
      // Compatible, save the latest response time
      const ms = parseInt(response.ms, 10);
      current.ms = ms;
      // Add the latest response to the history and limit to 50
      let { history } = current;
      history.push(ms);
      history = history.slice(-50);
      current.history = history;
      // Determine the median value from the latency history
      const values = [...history];
      values.sort((a, b) => a - b);
      current.median = parseInt((values[(values.length - 1) >> 1] + values[values.length >> 1]) / 2, 10);
      // Determine if it's a compatible response
      let validResponse = false;
      switch (path) {
        case '/v1/history/get_actions': {
          validResponse = !!(
            response.data
            && response.data.actions
            && response.data.actions.length > 0
            && !response.data.actions[0].account_action_seq <= 0
          );
          break;
        }
        default: {
          console.log(response.status === 200)
          validResponse = (response.status === 200);
          break;
        }
      }
      console.log("valid", path, response, validResponse);
      if (!validResponse) {
        // Response failed to meet criteria to be compatible
        current.failure += 1;
        // Determine if this node qualifies as "failing"
        current.failureRate = parseInt((current.failure / current.attempt) * 100, 10);
        current.failing = ((current.attempt > 2) && current.failureRate >= 60)
          ? 'nohistory'
          : false;
      } else {
        // Inc the success rate
        current.success += 1;
        current.response = response.data;
        // Is this node available and ready?
        if (current.success >= 4) {
          current.available = true;
        }
        // Set the sequence number for this latest action
        if (response.data.actions) {
          current.seq = response.data.actions[0].account_action_seq;
        }
        // Determine if this number is a new higher sequence number from what's known
        if (current.seq > newMaxSequence) {
          newMaxSequence = current.seq;
        }
      }
      return Object.assign({}, state, {
        data,
        maxSequence: newMaxSequence,
        path,
        pending: state.pending - 1,
        results: [current, ...others],
      });
    }
    case types.UTILS_PING_NODE_FAILURE: {
      const {
        data,
        error,
        host,
        path,
        producer
      } = action.payload;
      const { current, others } = splitResultsByHost(host, state.results);
      current.producer = producer;
      current.loading = false;
      // Set a fake number to drop to the bottom of the list
      current.seq = 0;
      // Set failure status and count
      current.failed = true;
      current.failure += 1;
      current.error = error;
      // Determine if this node qualifies as "failing"
      current.failureRate = parseInt((current.failure / current.attempt) * 100, 10);
      current.failing = ((current.attempt > 2) && current.failureRate >= 60)
        ? 'noconnection'
        : false;

      return Object.assign({}, state, {
        data,
        error,
        path,
        pending: state.pending - 1,
        results: [current, ...others]
      });
    }
    case types.UTILS_PING_SET_ESTIMATED: {
      return Object.assign({}, state, {
        estimated: action.payload.estimated
      });
    }
    default: {
      return state;
    }
  }
}

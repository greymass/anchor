import axios from 'axios';
import { defer, find } from 'lodash';
import PQueue from 'p-queue';

import * as types from './types';

const queue = new PQueue({
  concurrency: 4
});

const instance = axios.create({
  timeout: 3000,
});

instance.interceptors.request.use((config) => {
  const modified = Object.assign({}, config);
  modified.ts = performance.now();
  return modified;
});

instance.interceptors.response.use((response) => {
  const modified = Object.assign({}, response);
  modified.ms = Number(performance.now() - modified.config.ts);
  return modified;
});

export function pingNode(endpoint, data = {}, path = '/v1/history/get_actions') {
  return (dispatch: () => void, getState) => {
    const { app } = getState();
    const { host, producer } = endpoint;
    dispatch({
      type: types.UTILS_PING_NODE_PENDING,
      payload: {
        data,
        host,
        path,
        producer,
      }
    });
    queue.add(() =>
      instance
        .post(`${host}${path}`, data)
        .then((response) => dispatch({
          type: types.UTILS_PING_NODE_SUCCESS,
          payload: {
            app,
            data,
            host,
            path,
            producer,
            response,
          }
        }))
        .catch((error) => dispatch({
          type: types.UTILS_PING_NODE_FAILURE,
          payload: {
            data,
            host,
            path,
            producer,
            error
          }
        })));
  };
}

export function pingNodes(endpoints, data = {}, path = '/v1/history/get_actions') {
  return (dispatch: () => void, getState) => {
    const { ping } = getState();
    const { results } = ping;
    // Shuffle for fairness
    const shuffled = shuffleArray(endpoints);
    shuffled.forEach((endpoint) => {
      const { host } = endpoint;
      const result = find(results, { host });
      if (!result || !result.failing) {
        dispatch(pingNode(endpoint, data, path));
      }
    });
  };
}

export function pingSetEstimatedRequests(estimated) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.UTILS_PING_SET_ESTIMATED,
      payload: {
        estimated
      }
    });
  };
}

export function pingStop() {
  return (dispatch: () => void) => {
    queue.clear();
    dispatch({
      type: types.UTILS_PING_NODE_STOP
    });
  };
}

export function pingReset() {
  return (dispatch: () => void) => {
    queue.clear();
    dispatch({
      type: types.UTILS_PING_NODE_RESET
    });
  };
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * Based on: https://stackoverflow.com/a/12646864
 */

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default {
  pingNode,
  pingNodes,
  pingReset,
  pingSetEstimatedRequests,
  pingStop
};

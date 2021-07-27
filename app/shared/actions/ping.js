import { find } from 'lodash';
import { httpQueue, httpClient } from '../utils/http/generic';
import * as types from './types';

function pingNode(endpoint, data = {}, path = '/v1/chain/get_account') {
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
    httpQueue.add(() =>
      httpClient
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

function pingNodes(endpoints, data = {}, path = '/v1/chain/get_account') {
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

function pingSetEstimatedRequests(estimated) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.UTILS_PING_SET_ESTIMATED,
      payload: {
        estimated
      }
    });
  };
}

function pingStop() {
  return (dispatch: () => void) => {
    httpQueue.clear();
    dispatch({
      type: types.UTILS_PING_NODE_STOP
    });
  };
}

function pingReset() {
  return (dispatch: () => void) => {
    httpQueue.clear();
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

export {
  pingNode,
  pingNodes,
  pingReset,
  pingSetEstimatedRequests,
  pingStop
};

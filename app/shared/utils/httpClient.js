import axios from 'axios';
import PQueue from 'p-queue';

import * as types from '../actions/types';

const { remote } = require('electron');

const httpQueue = new PQueue({
  concurrency: 1
});

const httpClient = axios.create({
  timeout: 3000,
});

httpClient.interceptors.request.use(async (config) => {
  const modified = Object.assign({}, config);
  const store = remote.getGlobal('store');
  const { connection, settings } = store.getState();
  if (connection.dfuseEndpoint) {
    modified.headers.Authorization = dfuseToken(connection, settings, store);
  }
  modified.ts = performance.now();
  return modified;
});

httpClient.interceptors.response.use((response) => {
  const modified = Object.assign({}, response);
  modified.ms = Number(performance.now() - modified.config.ts);
  return modified;
});

const dfuseToken = async (connection, settings, store) => {
  const hasApiKey = (settings.dfuseKey);
  const hasValidToken = (
    // check that the jwt exists
    settings.dfuseAuthorization
    // and that the token is not expired
    && (
      settings.dfuseAuthorizationExpires
      && settings.dfuseAuthorizationExpires * 1000 > Date.now()
    )
  );
  if (hasValidToken) {
    // Use JWT token if currently valid
    return `Bearer ${settings.dfuseAuthorization}`;
  } else if (hasApiKey) {
    // Retrieve new JWT token if API key exists but current is invalid
    const response = await axios.post(connection.httpEndpoint, {
      api_key: settings.dfuseKey
    });
    // Dispatch setting to use saved session for future requests
    store.dispatch({
      type: types.SET_SETTING,
      payload: {
        dfuseAuthorization: response.token,
        dfuseAuthorizationExpires: response.expires_at,
      }
    });
    // Set headers for this request
    return `Bearer ${response.token}`;
  }
};

export default {
  httpClient,
  httpQueue
};

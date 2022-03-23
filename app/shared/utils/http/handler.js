import axios from 'axios';
import PQueue from 'p-queue';

const { ipcRenderer } = require('electron');

const httpQueue = new PQueue({
  concurrency: 2,
  timeout: 30000,
});

setInterval(() => {
  if (httpQueue.size > 10000) {
    httpQueue.clear();
  }
}, 1000);

const createHttpHandler = async (connection) => {
  const headers = {};
  if (connection.dfuseEndpoint) {
    headers.Authorization = await dfuseToken(connection);
  }

  const httpClient = axios.create({
    headers,
    timeout: 30000,
  });

  return {
    httpClient,
    httpQueue,
  };
};

const dfuseToken = async (connection) => {
  const hasApiKey = !!(connection.dfuseKey);
  const hasValidToken = !!(
    // check that the jwt exists
    connection.dfuseAuthorization
    // and that the token is not expired
    && (
      connection.dfuseAuthorizationExpires
      && connection.dfuseAuthorizationExpires * 1000 > Date.now()
    )
  );
  if (hasValidToken) {
    // Use JWT token if currently valid
    return `Bearer ${connection.dfuseAuthorization}`;
  } else if (hasApiKey) {
    // Retrieve new JWT token if API key exists but current is invalid
    const response = await axios.post('https://auth.dfuse.io/v1/auth/issue', {
      api_key: connection.dfuseKey
    });
    // Globally update the authorization header with this data
    ipcRenderer.send('setAuthorizationHeader', response.data.token, response.data.expires_at);
    // Set headers for this request
    return `Bearer ${response.data.token}`;
  }
};

export default { createHttpHandler };

import axios from 'axios';
import PQueue from 'p-queue';

const httpQueue = new PQueue({
  concurrency: 5
});

const httpClient = axios.create({
  timeout: 30000,
});

httpClient.interceptors.request.use(async (config) => {
  const modified = Object.assign({}, config);
  modified.ts = performance.now();
  return modified;
});

httpClient.interceptors.response.use((response) => {
  const modified = Object.assign({}, response);
  modified.ms = Number(performance.now() - modified.config.ts);
  return modified;
});

export default {
  httpClient,
  httpQueue
};

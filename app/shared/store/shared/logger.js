import { createLogger } from 'redux-logger';

const logger = createLogger({
  level: 'warn',
  collapsed: true
});

export default logger;

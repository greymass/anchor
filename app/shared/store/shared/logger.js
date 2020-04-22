import { createLogger } from 'redux-logger';

const logger = createLogger({
  collapsed: true,
  duration: true,
  level: 'warn',
});

export default logger;

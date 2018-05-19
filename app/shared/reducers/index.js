// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import accounts from './accounts';
import producers from './producers';
import settings from './settings';

const rootReducer = combineReducers({
  accounts,
  producers,
  router,
  settings
});

export default rootReducer;

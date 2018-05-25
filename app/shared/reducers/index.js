// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import accounts from './accounts';
import globals from './globals';
import producers from './producers';
import settings from './settings';
import validate from './validate';
import wallet from './wallet';

const rootReducer = combineReducers({
  accounts,
  globals,
  producers,
  router,
  settings,
  validate,
  wallet
});

export default rootReducer;

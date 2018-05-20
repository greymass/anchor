// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import accounts from './accounts';
import producers from './producers';
import settings from './settings';
import wallet from './wallet';

const rootReducer = combineReducers({
  accounts,
  producers,
  router,
  settings,
  wallet
});

export default rootReducer;

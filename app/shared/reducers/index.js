// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import accounts from './accounts';
import app from './app';
import balances from './balances';
import chain from './chain';
import connection from './connection';
import keys from './keys';
import globals from './globals';
import producers from './producers';
import settings from './settings';
import system from './system';
import transaction from './transaction';
import validate from './validate';
import wallet from './wallet';

const rootReducer = combineReducers({
  accounts,
  app,
  balances,
  chain,
  connection,
  globals,
  keys,
  producers,
  router,
  settings,
  system,
  transaction,
  validate,
  wallet
});

export default rootReducer;

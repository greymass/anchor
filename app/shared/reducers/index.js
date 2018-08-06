// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import accounts from './accounts';
import actions from './actions';
import app from './app';
import balances from './balances';
import blockexplorers from './blockexplorers';
import chain from './chain';
import connection from './connection';
import contracts from './contracts';
import customtokens from './customtokens';
import keys from './keys';
import globals from './globals';
import producers from './producers';
import proposals from './proposals';
import settings from './settings';
import system from './system';
import tables from './tables';
import transaction from './transaction';
import validate from './validate';
import wallet from './wallet';
import wallets from './wallets';

const rootReducer = combineReducers({
  accounts,
  actions,
  app,
  balances,
  blockexplorers,
  chain,
  connection,
  contracts,
  customtokens,
  globals,
  keys,
  producers,
  proposals,
  router,
  settings,
  system,
  tables,
  transaction,
  validate,
  wallet,
  wallets
});

export default rootReducer;

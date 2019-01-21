// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

import accounts from './accounts';
import actions from './actions';
import app from './app';
import balances from './balances';
import blockchains from './blockchains';
import blockexplorers from './blockexplorers';
import chain from './chain';
import connection from './connection';
import contracts from './contracts';
import customtokens from './customtokens';
import globals from './globals';
import keys from './keys';
import ledger from './hardware/ledger';
import ping from './utils/ping';
import producers from './producers';
import prompt from './utils/prompt';
import proposals from './proposals';
import settings from './settings';
import system from './system';
import systemlog from './system/log';
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
  blockchains,
  blockexplorers,
  chain,
  connection,
  contracts,
  customtokens,
  globals,
  keys,
  ledger,
  ping,
  producers,
  prompt,
  proposals,
  router,
  settings,
  system,
  systemlog,
  tables,
  transaction,
  validate,
  wallet,
  wallets
});

export default rootReducer;

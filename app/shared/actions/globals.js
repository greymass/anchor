import { isEmpty } from 'lodash';
import { Decimal } from 'decimal.js';

import * as types from './types';

import eos from './helpers/eos';

export function getGlobals() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_GLOBALS_REQUEST
    });
    const { connection } = getState();
    eos(connection).getTableRows(true, 'eosio', 'eosio', 'global').then((results) => dispatch({
      type: types.GET_GLOBALS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.GET_GLOBALS_FAILURE,
      payload: { err },
    }));
  };
}

export function getCurrencyStats(contractName = "eosio.token", symbolName) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCYSTATS_REQUEST
    });
    const { connection } = getState();
    const account = contractName.toLowerCase();
    const symbol = symbolName ? symbolName.toUpperCase() : connection.keyPrefix.toUpperCase();
    
    eos(connection).getCurrencyStats(account, symbol).then((results) => {
      if (isEmpty(results)) {
        return dispatch({
          type: types.GET_CURRENCYSTATS_FAILURE,
          payload: {
            account,
            symbol
          },
        });
      }
      return dispatch({
        type: types.GET_CURRENCYSTATS_SUCCESS,
        payload: {
          account,
          results,
          symbol
        }
      });
    }).catch((err) => dispatch({
      type: types.GET_CURRENCYSTATS_FAILURE,
      payload: {
        account,
        err,
        symbol
      },
    }));
  };
}

export function getRamStats() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_RAMSTATS_REQUEST
    });
    const { connection } = getState();
    const query = {
      scope: 'eosio',
      code: 'eosio',
      table: 'rammarket',
      json: true
    };

    eos(connection).getTableRows(query).then((results) => {
      const { rows } = results;
      const baseBalance = rows[0].base.balance.split(' ')[0];
      const quoteBalance = rows[0].quote.balance.split(' ')[0];

      return dispatch({
        type: types.GET_RAMSTATS_SUCCESS,
        payload: {
          base_balance: baseBalance,
          quote_balance: quoteBalance
        }
      });
    }).catch((err) => dispatch({
      type: types.GET_RAMSTATS_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getCurrencyStats,
  getGlobals,
  getRamStats
};

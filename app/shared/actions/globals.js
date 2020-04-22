import { isEmpty } from 'lodash';

import * as types from './types';

import eos from './helpers/eos';

export function getGlobals() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GET_GLOBALS_REQUEST
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'global',
    };
    eos(connection, false, true).rpc.get_table_rows(query).then((results) => dispatch({
      type: types.SYSTEM_GET_GLOBALS_SUCCESS,
      payload: { results }
    })).catch((err) => dispatch({
      type: types.SYSTEM_GET_GLOBALS_FAILURE,
      payload: { err },
    }));
  };
}

export function getCurrencyStats(contractName = 'eosio.token', symbolName = 'EOS') {
  const account = contractName.toLowerCase();
  const symbol = symbolName.toUpperCase();
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_CURRENCYSTATS_REQUEST
    });
    const { connection } = getState();
    eos(connection, false, true).rpc.get_currency_stats(account, symbol).then((results) => {
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
    const { connection } = getState();
    if (!connection.stakedResources) {
      return;
    }
    dispatch({
      type: types.GET_RAMSTATS_REQUEST
    });
    const query = {
      scope: 'eosio',
      code: 'eosio',
      table: 'rammarket',
      json: true
    };

    eos(connection, false, true).rpc.get_table_rows(query).then((results) => {
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

export function getRamPrice() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_RAMPRICE_PENDING
    });
    const { connection } = getState();
    const query = {
      json: true,
      code: 'eosio',
      scope: 'eosio',
      table: 'rammarket',
      limit: 1,
    };

    if (!connection.httpEndpoint) {
      return;
    }

    eos(connection, false, true).rpc.get_table_rows(query).then((results) => dispatch({
      type: types.SYSTEM_RAMPRICE_SUCCESS,
      payload: {
        results,
      }
    })).catch((err) => dispatch({
      type: types.SYSTEM_RAMPRICE_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getCurrencyStats,
  getGlobals,
  getRamStats,
  getRamPrice,
};

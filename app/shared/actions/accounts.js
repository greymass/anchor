import { forEach } from 'lodash';

import * as types from './types';
import eos from './helpers/eos';

export function clearAccountCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_ACCOUNT_CACHE
    });
  };
}

export function clearBalanceCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_BALANCE_CACHE
    });
  };
}

export function refreshAccountBalances(account) {
  return (dispatch: () => void) => {
    dispatch(clearBalanceCache());
    return dispatch(getCurrencyBalance(account));
  };
}

export function claimUnstaked(owner) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    dispatch({
      type: types.SYSTEM_REFUND_PENDING
    });
    return eos(connection).refund({
      owner
    }).then((tx) => {
      // Reload the account
      dispatch(getAccount(owner));
      // Reload the balances
      dispatch(getCurrencyBalance(owner));
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_REFUND_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_REFUND_FAILURE
    }));
  };
}

export function getAccount(account = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_REQUEST,
      payload: { account_name: account }
    });
    const {
      connection,
      settings
    } = getState();
    if (account && (settings.node || settings.node.length !== 0)) {
      eos(connection).getAccount(account).then((results) => {
        // Trigger the action to load this accounts balances
        dispatch(getCurrencyBalance(account));
        // PATCH - Force in self_delegated_bandwidth if it doesn't exist
        const modified = results;
        if (!modified.self_delegated_bandwidth) {
          modified.self_delegated_bandwidth = {
            cpu_weight: '0.0000 EOS',
            net_weight: '0.0000 EOS'
          };
        }
        // Dispatch the results of the account itself
        return dispatch({
          type: types.GET_ACCOUNT_SUCCESS,
          payload: { results: modified }
        });
      }).catch((err) => dispatch({
        type: types.GET_ACCOUNT_FAILURE,
        payload: { err, account_name: account },
      }));
      return;
    }
    dispatch({
      type: types.GET_ACCOUNT_FAILURE,
      payload: { account_name: account },
    });
  };
}

export function getAccounts(accounts = []) {
  return (dispatch: () => void) =>
    forEach(accounts, (account) => dispatch(getAccount(account)));
}

export function getActions(account, start, offset) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings,
      actions
    } = getState();

    const actionHistory = (actions && actions[account]) || { list: [] };

    dispatch({
      type: types.GET_ACTIONS_REQUEST,
      payload: { account_name: account }
    });

    if (account && (settings.node || settings.node.length !== 0)) {
      eos(connection).getActions(account, start, offset).then((results) => {
        const resultNewestAction = results.actions[results.actions.length - 1];
        const resultsNewestActionId = resultNewestAction && resultNewestAction.account_action_seq;

        const stateNewestAction = actionHistory.list[0];
        const stateNewestActionId = stateNewestAction && stateNewestAction.account_action_seq;

        if (resultsNewestActionId === stateNewestActionId) {
          return dispatch({
            type: types.GET_ACTIONS_SUCCESS,
            payload: {
              no_change: true,
              account_name: account
            }
          });
        }

        return dispatch({
          type: types.GET_ACTIONS_SUCCESS,
          payload: {
            list: mergeActionLists(actionHistory.list, results.actions),
            account_name: account
          }
        });
      }).catch((err) => dispatch({
        type: types.GET_ACTIONS_FAILURE,
        payload: { err, account_name: account },
      }));
      return;
    }
    dispatch({
      type: types.GET_ACTIONS_FAILURE,
      payload: { account_name: account },
    });
  };
}

function mergeActionLists(originalList, newActions) {
  const newList = originalList.concat(newActions);

  return newList.filter(uniqReqId).sort(sortByReqId);
}

function uniqReqId(action, index, self) {
  const actionId = action.account_action_seq;

  return self.map(actionItem => actionItem.account_action_seq).indexOf(actionId) === index;
}

function sortByReqId(actionOne, actionTwo) {
  return actionTwo.account_action_seq - actionOne.account_action_seq;
}

export function getCurrencyBalance(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_BALANCE_REQUEST,
      payload: { account_name: account }
    });
    const {
      connection,
      settings
    } = getState();
    if (account && (settings.node || settings.node.length !== 0)) {
      const { customTokens } = settings;
      let selectedTokens = ['eosio.token:EOS'];
      if (customTokens && customTokens.length > 0) {
        selectedTokens = [...customTokens, ...selectedTokens];
      }
      forEach(selectedTokens, (namespace) => {
        const [contract, symbol] = namespace.split(':');
        eos(connection).getCurrencyBalance(contract, account, symbol).then((results) =>
          dispatch({
            type: types.GET_ACCOUNT_BALANCE_SUCCESS,
            payload: {
              account_name: account,
              contract,
              symbol,
              tokens: formatBalances(results)
            }
          }))
          .catch((err) => dispatch({
            type: types.GET_ACCOUNT_BALANCE_FAILURE,
            payload: { err, account_name: account }
          }));
      });
    }
    dispatch({
      type: types.GET_ACCOUNT_BALANCE_FAILURE,
      payload: { account_name: account },
    });
  };
}

function formatBalances(balances) {
  const formatted = {};
  for (let i = 0; i < balances.length; i += 1) {
    const [amount, symbol] = balances[i].split(' ');
    formatted[symbol] = parseFloat(amount);
  }
  return formatted;
}

export function getAccountByKey(key) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ACCOUNT_BY_KEY_PENDING,
      payload: { key }
    });
    const {
      connection,
      settings
    } = getState();
    if (key && (settings.node || settings.node.length !== 0)) {
      return eos(connection).getKeyAccounts(key).then((accounts) => dispatch({
        type: types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS,
        payload: { accounts }
      })).catch((err) => dispatch({
        type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
        payload: { err, key }
      }));
    }
    dispatch({
      type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
      payload: { key },
    });
  };
}

export function clearAccountByKey() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SYSTEM_ACCOUNT_BY_KEY_CLEAR
    });
  };
}

export default {
  clearAccountByKey,
  clearAccountCache,
  getAccount,
  getAccountByKey,
  getActions,
  getCurrencyBalance,
  refreshAccountBalances
};

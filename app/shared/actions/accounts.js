import { difference, find, forEach, intersection, map, orderBy, pick, reduce, sortBy, uniq } from 'lodash';

import * as types from './types';
import eos from './helpers/eos';
import { addCustomTokenBeos } from './settings';
import { getTable, getTableByBounds } from './table';
import { httpQueue, httpClient } from '../utils/httpClient';

const ecc = require('eosjs-ecc');

export function clearAccountCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_ACCOUNT_CACHE
    });
  };
}

export function clearActionsCache() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.CLEAR_ACCOUNT_ACTIONS_CACHE
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

export function refreshAccountBalances(account, requestedTokens) {
  return (dispatch: () => void) =>
    dispatch(getCurrencyBalance(account, requestedTokens));
}

export function claimUnstaked(owner) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    dispatch({
      type: types.SYSTEM_REFUND_PENDING
    });
    return eos(connection, true).refund({
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

export function getContractHash(accountName) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ACCOUNT_HAS_CONTRACT_PENDING,
      payload: { account_name: accountName }
    });
    const {
      connection,
      settings
    } = getState();

    if (accountName && (settings.node || settings.node.length !== 0)) {
      eos(connection).getCodeHash(accountName).then((response) => dispatch({
        type: types.SYSTEM_ACCOUNT_HAS_CONTRACT_SUCCESS,
        payload: {
          account_name: accountName,
          contract_hash: response.code_hash
        }
      })).catch((err) => dispatch({
        type: types.SYSTEM_ACCOUNT_HAS_CONTRACT_FAILURE,
        payload: { err },
      }));
    }
  };
}

export function checkAccountAvailability(account = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ACCOUNT_AVAILABLE_PENDING,
      payload: { account_name: account }
    });
    const {
      connection,
      settings
    } = getState();

    if (account && (settings.node || settings.node.length !== 0)) {
      eos(connection).getAccount(account).then(() => dispatch({
        type: types.SYSTEM_ACCOUNT_AVAILABLE_FAILURE,
        payload: { account_name: account }
      })).catch((err) => {
        if (err.status === 500) {
          dispatch({
            type: types.SYSTEM_ACCOUNT_AVAILABLE_SUCCESS,
            payload: { account_name: account }
          });
        } else {
          return dispatch({
            type: types.SYSTEM_ACCOUNT_AVAILABLE_FAILURE,
            payload: { err },
          });
        }
      });
      return;
    }
    dispatch({
      type: types.GET_ACCOUNT_AVAILABLE_FAILURE,
      payload: { account_name: account },
    });
  };
}

export function checkAccountExists(account = '', node) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ACCOUNT_EXISTS_PENDING,
      payload: { account_name: account }
    });
    const {
      connection,
      settings
    } = getState();

    if (account && (settings.node || settings.node.length !== 0)) {
      let newConnection;

      if (node) {
        newConnection = Object.assign({}, connection, {
          node,
          httpEndpoint: node
        });
      }

      eos(newConnection || connection).getAccount(account).then(() => dispatch({
        type: types.SYSTEM_ACCOUNT_EXISTS_SUCCESS,
        payload: { account_name: account }
      })).catch((err) => dispatch({
        type: types.SYSTEM_ACCOUNT_EXISTS_FAILURE,
        payload: { err }
      }));
    }
  };
}

export function getAccount(account = '') {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.GET_ACCOUNT_REQUEST,
      payload: { account_name: account }
    });
    // Prevent private keys from submitting
    if (ecc.isValidPrivate(account) || (account.startsWith('5') && account.length === 51)) {
      return dispatch({
        type: types.VALIDATE_ACCOUNT_FAILURE,
      });
    }
    const {
      connection
    } = getState();
    if (account && (connection.httpEndpoint || (connection.httpEndpoint && connection.httpEndpoint.length !== 0))) {
      eos(connection).getAccount(account).then((results) =>
        dispatch(processLoadedAccount(connection.chainId, account, results)))
        .catch((err) => dispatch({
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

export function getDelegatedBalances(account) {
  return (dispatch: () => void, getState) => {
    dispatch(getTable('eosio', account, 'delband'));
  };
}

export function processLoadedAccount(chainId, account, results) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    // get currency balances
    dispatch(getCurrencyBalance(account));
    // get delegated balances
    dispatch(getDelegatedBalances(account));
    // get rex balances
    dispatch(getTableByBounds('eosio', 'eosio', 'rexbal', account, account));
    dispatch(getTableByBounds('eosio', 'eosio', 'rexfund', account, account));
    // PATCH - Force in self_delegated_bandwidth if it doesn't exist
    const modified = Object.assign({}, results);
    if (!modified.self_delegated_bandwidth) {
      modified.self_delegated_bandwidth = {
        cpu_weight: `0.0000 ${connection.chainSymbol || 'EOS'}`,
        net_weight: `0.0000 ${connection.chainSymbol || 'EOS'}`
      };
    }
    // If a proxy voter is set, cache it's data for vote referencing
    if (modified.voter_info && modified.voter_info.proxy) {
      dispatch(getAccount(modified.voter_info.proxy));
    }
    // Dispatch the results of the account itself
    return dispatch({
      type: types.GET_ACCOUNT_SUCCESS,
      payload: {
        account,
        chainId,
        results: modified
      }
    });
  };
}

export function getAccounts(accounts = []) {
  return (dispatch: () => void, getState) => {
    const { connection, features } = getState();
    const { endpoints } = features;
    if (endpoints['/v1/chain/get_accounts']) {
      httpQueue.add(() =>
        httpClient
          .post(`${connection.httpEndpoint}/v1/chain/get_accounts`, {
            accounts
          })
          .then((response) =>
            forEach(response.data, (results) =>
              dispatch(processLoadedAccount(connection.chainId, results.account_name, results))))
          .catch((err) => dispatch({
            type: types.GET_ACCOUNTS_FAILURE,
            payload: { err }
          })));
    } else {
      return forEach(accounts, (account) => dispatch(getAccount(account)));
    }
  };
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

function getSelectedTokens(connection, requestedTokens, settings) {
  const { customTokens } = settings;
  const newCustomTokens = customTokens.filter((token) => (connection.chainId === token.split(':')[0]));
  let selectedTokens = [`${connection.chainId}:eosio.token:${connection.chainSymbol || 'EOS'}`];
  if (newCustomTokens && newCustomTokens.length > 0) {
    selectedTokens = [...newCustomTokens, ...selectedTokens];
  }
  // if specific tokens are requested, use them
  if (requestedTokens) {
    requestedTokens.map((token) => `${connection.chainId}:${token}`);
    selectedTokens = requestedTokens;
  }
  return selectedTokens;
}

export function getCurrencyBalance(account, requestedTokens = false) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      features,
      settings
    } = getState();
    const {
      endpoints
    } = features;

    if (account && (settings.node || settings.node.length !== 0)) {
      let selectedTokens = getSelectedTokens(connection, requestedTokens, settings);
      dispatch({
        type: types.GET_ACCOUNT_BALANCE_REQUEST,
        payload: {
          account_name: account,
          tokens: selectedTokens
        }
      });

      if (connection.chainSymbol === 'BEOS') {
        selectedTokens = [];
        return eos(connection).getCurrencyStats('eosio.token', '').then((data) => {
          const allTokens = Object.keys(data);
          allTokens.forEach((token) => {
            selectedTokens.push(`${connection.chainId}:eosio.token:${token}`);
          });
          forEach(selectedTokens, (namespace) => {
            const [, contract, symbol] = namespace.split(':');
            dispatch(addCustomTokenBeos('eosio.token', symbol));
            eos(connection).getCurrencyBalance(contract, account, symbol).then((results) =>
              dispatch({
                type: types.GET_ACCOUNT_BALANCE_SUCCESS,
                payload: {
                  account_name: account,
                  contract,
                  precision: formatPrecisions(results),
                  symbol,
                  tokens: formatBalances(results, symbol)
                }
              }))
              .catch((err) => dispatch({
                type: types.GET_ACCOUNT_BALANCE_FAILURE,
                payload: { err, account_name: account, contract, symbol }
              }));
          });
          return selectedTokens;
        }).catch((err) => dispatch({
          type: types.GET_ACCOUNT_BALANCE_FAILURE,
          payload: { err, account_name: account }
        }));
      }
      // Disabled until API can be optimized.
      // if (endpoints && endpoints.includes('/v1/chain/get_currency_balances')) {
      //   httpQueue.add(() =>
      //     httpClient
      //       .post(`${connection.httpEndpoint}/v1/chain/get_currency_balances`, {
      //         account
      //       })
      //       .then((results) =>
      //         dispatch({
      //           type: types.GET_ACCOUNT_BALANCES_SUCCESS,
      //           payload: {
      //             account,
      //             precisions: reduce(
      //               results.data,
      //               (res, { amount, symbol }) => ({
      //                 ...res,
      //                 ...formatPrecisions([`${amount} ${symbol}`])
      //               }), {}
      //             ),
      //             results: results.data,
      //             tokens: reduce(
      //               results.data,
      //               (res, { amount, symbol }) => ({
      //                 ...res,
      //                 ...formatBalances([`${amount} ${symbol}`])
      //               }), {}
      //             )
      //           }
      //         }))
      //       .catch((err) => dispatch({
      //         type: types.GET_ACCOUNT_BALANCE_FAILURE,
      //         payload: { err }
      //       })));
      // } else {
      forEach(selectedTokens, (namespace) => {
        const [, contract, symbol] = namespace.split(':');

        eos(connection)
          .getCurrencyBalance(contract, account, symbol)
          .then((results) =>
            dispatch({
              type: types.GET_ACCOUNT_BALANCE_SUCCESS,
              payload: {
                account_name: account,
                contract,
                precision: formatPrecisions(results),
                symbol,
                tokens: formatBalances(results, symbol)
              }
            }))
          .catch((err) => dispatch({
            type: types.GET_ACCOUNT_BALANCE_FAILURE,
            payload: { err, account_name: account }
          }));
      });
    // }
    }
  };
}

// Expects array of balance strings, e.g. ['1.2345 EOS']
function formatPrecisions(balances) {
  const precision = {};
  for (let i = 0; i < balances.length; i += 1) {
    const [amount, symbol] = balances[i].split(' ');
    precision[symbol] = getSuffixLength(amount);
  }
  return precision;
}

function getSuffixLength(string) {
  const [, suffix] = string.split('.');
  let suffixLen = 0;
  if (suffix !== undefined) {
    suffixLen = suffix.length;
  }
  return suffixLen;
}

function formatBalances(balances, forcedSymbol = false) {
  const formatted = {};
  if (forcedSymbol) {
    formatted[forcedSymbol] = 0;
  }
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
    // Prevent private keys from submitting
    if (ecc.isValidPrivate(key) || !key.startsWith('EOS')) {
      return dispatch({
        type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
      });
    }
    const {
      connection,
      settings
    } = getState();
    if (key && (settings.node || settings.node.length !== 0)) {
      return eos(connection).getKeyAccounts(key).then((accounts) => {
        dispatch(getAccounts(accounts.account_names));
        return dispatch({
          type: types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS,
          payload: { accounts }
        });
      }).catch((err) => dispatch({
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

export function getAccountByKeys(keys) {
  return (dispatch: () => void, getState) => {
    // Prevent private keys from submitting
    const filtered = keys.filter((key) => !ecc.isValidPrivate(key))
    const {
      connection,
      features,
      settings
    } = getState();
    const {
      endpoints
    } = features;
    if (keys.length && (settings.node || settings.node.length !== 0)) {
      if (endpoints && endpoints.includes('/v1/history/get_keys_accounts')) {
        dispatch({
          type: types.SYSTEM_ACCOUNT_BY_KEYS_PENDING,
          payload: { keys }
        });
        return httpQueue.add(() =>
          httpClient
            .post(`${connection.httpEndpoint}/v1/history/get_keys_accounts`, {
              public_keys: keys
            })
            .then((results) => {
              return dispatch({
                type: types.SYSTEM_ACCOUNT_BY_KEYS_SUCCESS,
                payload: {
                  accounts: results.data,
                }
              });
            })
            .catch((err) => dispatch({
              type: types.GET_ACCOUNT_BALANCE_FAILURE,
              payload: { err }
            })));
      } else {
        dispatch({
          type: types.SYSTEM_ACCOUNT_BY_KEY_PENDING,
          payload: { keys }
        });
        return keys.forEach((key) => eos(connection).getKeyAccounts(key).then((accounts) => {
          dispatch(getAccounts(accounts.account_names));
          return dispatch({
            type: types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS,
            payload: { accounts }
          });
        }).catch((err) => dispatch({
          type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
          payload: { err, keys }
        })))
      }
    }
    return dispatch({
      type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
      payload: { keys },
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

export function syncAccounts() {
  return (dispatch: () => void, getState) => {
    const {
      accounts,
      settings,
      wallets
    } = getState();
    // Filter wallet data down to the current chain
    const chainWallets = wallets.filter((w) => (w.chainId === settings.chainId));
    // Create a list of all account names loaded for this chain
    const chainAccounts = uniq(map(chainWallets, 'account'));
    // Determine which accounts haven't been loaded into state
    const missingAccountDataFor = difference(chainAccounts, Object.keys(accounts));
    // Immediately fetch all accounts for which data is missing
    if (missingAccountDataFor.length > 0) {
      dispatch(getAccounts(missingAccountDataFor));
    }
    // Load any existing account data that matched our existing accounts
    const existingAccounts = Object.values(pick(accounts, chainAccounts));
    // If any exist
    if (existingAccounts.length > 0) {
      // Determine the oldest account
      const [mostStaleAccount] = sortBy(existingAccounts, ['head_block_num']);
      // and update it
      dispatch(getAccount(mostStaleAccount.account_name));
    }
  };
}

export default {
  checkAccountAvailability,
  checkAccountExists,
  clearAccountByKey,
  clearAccountCache,
  clearActionsCache,
  getAccount,
  getAccountByKey,
  getAccountByKeys,
  getActions,
  getCurrencyBalance,
  syncAccounts,
  refreshAccountBalances
};

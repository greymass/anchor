import { chunk, difference, find, forEach, intersection, map, orderBy, pick, reduce, sortBy, uniq } from 'lodash';

import * as types from './types';
import eos from './helpers/eos';
import { addCustomToken, addCustomTokenBeos } from './settings';
import { getTable, getTableByBounds } from './table';
import { createHttpHandler } from '../utils/http/handler';
import EOSHandler from '../utils/EOS/Handler';

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
      connection,
      settings,
    } = getState();
    const {
      account,
      authorization
    } = settings;
    dispatch({
      type: types.SYSTEM_REFUND_PENDING
    });
    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'refund',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            owner
          }
        }
      ],
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
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
  return async (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_ACCOUNT_HAS_CONTRACT_PENDING,
      payload: { account_name: accountName }
    });
    const {
      connection,
      settings
    } = getState();
    const { httpClient, httpQueue } = await createHttpHandler(connection);
    if (accountName && (settings.node || settings.node.length !== 0)) {
      httpQueue.add(() =>
        httpClient
          .post(`${connection.httpEndpoint}/v1/chain/get_code_hash`, {
            account_name: accountName
          })
          .then((response) => dispatch({
            type: types.SYSTEM_ACCOUNT_HAS_CONTRACT_SUCCESS,
            payload: {
              account_name: accountName,
              contract_hash: response.data.code_hash
            }
          }))
          .catch((err) => dispatch({
            type: types.SYSTEM_ACCOUNT_HAS_CONTRACT_FAILURE,
            payload: { err },
          })));
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
      eos(connection, false, true).rpc.get_account(account).then((response) => dispatch({
        type: types.SYSTEM_ACCOUNT_AVAILABLE_FAILURE,
        payload: { account_name: account, response }
      })).catch((err) => {
        if (err.response.status === 500) {
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

      eos(newConnection || connection, false, true).rpc.get_account(account).then(() => dispatch({
        type: types.SYSTEM_ACCOUNT_EXISTS_SUCCESS,
        payload: { account_name: account }
      })).catch((err) => dispatch({
        type: types.SYSTEM_ACCOUNT_EXISTS_FAILURE,
        payload: { err }
      }));
    }
  };
}

export function getAccount(account = '', onlyAccount = true) {
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
      eos(connection, false, true).rpc.get_account(account)
        .then(async (response) => {
          if (!response.core_liquid_balance) {
            const balance = await eos(connection, false, true).rpc.get_currency_balance(connection.tokenContract, account, connection.chainSymbol);
            if (balance) {
              response.core_liquid_balance = balance[0];
            }
          }
          if (response.voter_info === null) {
            const query = {
              json: true,
              code: 'eosio',
              scope: 'eosio',
              table: 'voters',
              key_type: 'name',
              index_position: 3,
              lower_bound: account,
              upper_bound: account,
              limit: 1,
            };
            return eos(connection, false, true).rpc.get_table_rows(query)
              .then((result) => {
                // overload the voter info with table results
                response.voter_info = result.rows[0];
                return dispatch(processLoadedAccount(connection.chainId, account, response, onlyAccount));
              })
              .catch((err) => {
                console.log(err);
              });
          }
          return dispatch(processLoadedAccount(connection.chainId, account, response, onlyAccount));
        })
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
    const { connection } = getState();
    dispatch(getTable(connection.systemContract, account, 'delband'));
  };
}

export function processLoadedAccount(chainId, account, results, onlyAccount = true) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();
    if (!onlyAccount) {
      // get currency balances
      dispatch(getCurrencyBalance(account));
      if (connection.stakedResources !== false) {
        // get delegated balances
        dispatch(getDelegatedBalances(account));
      }
      // get rex balances
      if (connection.supportedContracts && connection.supportedContracts.includes('rex')) {
        dispatch(getTableByBounds('eosio', 'eosio', 'rexbal', account, account));
        dispatch(getTableByBounds('eosio', 'eosio', 'rexfund', account, account));
      }
    }
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
      dispatch(getAccount(modified.voter_info.proxy, true));
    }
    // Dispatch the results of the account itself
    return dispatch({
      type: types.GET_ACCOUNT_SUCCESS,
      payload: {
        account,
        chainId,
        connection,
        results: modified
      }
    });
  };
}

export function getAccounts(accounts = [], onlyAccount = false) {
  return async (dispatch: () => void, getState) => {
    const { connection, features } = getState();
    const { endpoints } = features;
    const { httpClient, httpQueue } = await createHttpHandler(connection);
    if (endpoints['/v1/chain/get_accounts']) {
      httpQueue.add(() =>
        httpClient
          .post(`${connection.httpEndpoint}/v1/chain/get_accounts`, {
            accounts
          })
          .then((response) =>
            forEach(response.data, (results) =>
              dispatch(processLoadedAccount(connection.chainId, results.account_name, results, onlyAccount))))
          .catch((err) => dispatch({
            type: types.GET_ACCOUNTS_FAILURE,
            payload: { err }
          })));
    } else {
      return forEach(accounts, (account) => dispatch(getAccount(account, onlyAccount)));
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
      eos(connection, false, true).rpc.history_get_actions(account, start, offset).then((results) => {
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
  let selectedTokens = [`${connection.chainId}:${connection.tokenContract}:${connection.chainSymbol || 'EOS'}`];
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
  return async (dispatch: () => void, getState) => {
    const {
      connection,
      features,
      settings
    } = getState();
    const { httpClient, httpQueue } = await createHttpHandler(connection);
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

      if (
        connection.chainSymbol === 'UTX'
        && !settings.customTokens.includes(`${settings.chainId}:eosio.token:UTXRAM`)
      ) {
        dispatch(addCustomToken('eosio.token', 'UTXRAM'));
      }


      if (connection.chainSymbol === 'BEOS') {
        selectedTokens = [];
        return eos(connection, false, true).rpc.get_currency_stats('eosio.token', '').then((data) => {
          const allTokens = Object.keys(data);
          allTokens.forEach((token) => {
            selectedTokens.push(`${connection.chainId}:eosio.token:${token}`);
          });
          forEach(selectedTokens, (namespace) => {
            const [, contract, symbol] = namespace.split(':');
            if (!settings.customTokens.includes(`${settings.chainId}:eosio.token:${symbol}`)) {
              dispatch(addCustomTokenBeos('eosio.token', symbol));
            }
            eos(connection, false, true).rpc.get_currency_balance(contract, account, symbol)
              .then((results) =>
                dispatch({
                  type: types.GET_ACCOUNT_BALANCE_SUCCESS,
                  payload: {
                    account_name: account,
                    contract,
                    precision: formatPrecisions(results, symbol, connection),
                    symbol,
                    tokens: formatBalances(results, symbol)
                  }
                }))
              .catch((err) => dispatch({
                type: types.GET_ACCOUNT_BALANCE_FAILURE,
                payload: {
                  err, account_name: account, contract, symbol
                }
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
      //   const tokens = settings.customTokens.filter((t) => {
      //     const [chain, ] = t.split(':');
      //     return chain === settings.chainId;
      //   }).map((t) => {
      //     const [chain, contract, token] = t.split(':');
      //     return `${contract}.${token}`;
      //   });
      //   httpQueue.add(() =>
      //     httpClient
      //       .post(`${connection.httpEndpoint}/v1/chain/get_currency_balances`, {
      //         account,
      //         tokens,
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
        httpQueue.add(() =>
          httpClient
            .post(`${connection.httpEndpoint}/v1/chain/get_currency_balance`, {
              code: contract,
              account,
              symbol,
            })
            .then((results) =>
              dispatch({
                type: types.GET_ACCOUNT_BALANCE_SUCCESS,
                payload: {
                  account_name: account,
                  contract,
                  precision: formatPrecisions(results.data, symbol, connection),
                  symbol,
                  tokens: formatBalances(results.data, symbol)
                }
              }))
            .catch((err) => dispatch({
              type: types.GET_ACCOUNT_BALANCE_FAILURE,
              payload: { err }
            })));
      });
      // }
    }
  };
}

// Expects array of balance strings, e.g. ['1.2345 EOS']
function formatPrecisions(balances, symbol, connection = undefined) {
  const precision = {};
  if (symbol === connection.chainSymbol) {
    precision[symbol] = connection.tokenPrecision;
  }

  for (let i = 0; i < balances.length; i += 1) {
    const [amount] = balances[i].split(' ');
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
  return async (dispatch: () => void, getState) => {
    const {
      connection,
      features,
      settings
    } = getState();
    const {
      endpoints
    } = features;
    const { httpClient, httpQueue } = await createHttpHandler(connection);
    const handler = new EOSHandler(connection);
    let convertedKey = handler.convert(key);
    // Don't allow conversion with dfuse endpoints or UX endpoints (which are dfuse)
    if (connection.dfuseEndpoint || connection.chainSymbol === 'UTX') {
      convertedKey = key;
    }
    dispatch({
      type: types.SYSTEM_ACCOUNT_BY_KEY_PENDING,
      payload: { key: convertedKey }
    });
    // Prevent private keys from submitting
    if (ecc.isValidPrivate(key)) {
      return dispatch({
        type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
        reason: 'invalid key',
        key,
      });
    }
    if (convertedKey && (settings.node || settings.node.length !== 0)) {
      if (endpoints && endpoints.includes('/v1/chain/get_accounts_by_authorizers')) {
        return httpClient
          .post(`${connection.httpEndpoint}/v1/chain/get_accounts_by_authorizers`, {
            keys: [convertedKey]
          })
          .then((results) => {
            const accounts = {
              account_names: results.data.accounts.map(a => a.account_name)
            };
            dispatch(getAccounts(accounts.account_names, true));
            return dispatch({
              type: types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS,
              payload: {
                accounts,
                key,
              }
            });
          }).catch((err) => dispatch({
            type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
            payload: { err, key }
          }));
      }
      return httpClient
        .post(`${connection.httpEndpoint}/v1/history/get_key_accounts`, {
          public_key: convertedKey
        })
        .then((results) => {
          const accounts = results.data;
          dispatch(getAccounts(accounts.account_names, true));
          if (key.substr(0, 3) === 'FIO') {
            return httpClient
              .post(`${connection.httpEndpoint}/v1/chain/get_fio_names`, {
                fio_public_key: key
              })
              .then((response) => dispatch({
                type: types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS,
                payload: {
                  accounts,
                  key,
                  addresses: response.data.fio_addresses
                }
              }))
              .catch((err) => {
                dispatch({
                  type: types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS,
                  payload: {
                    accounts,
                    key,
                    addresses: []
                  }
                });
                // return dispatch({
                //   type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
                //   payload: { err, key }
                // })
              });
          }
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
  return async (dispatch: () => void, getState) => {
    // Prevent private keys from submitting if they somehow were saved as a public key
    const filtered = keys.filter((key) => !ecc.isValidPrivate(key));
    const {
      connection,
      features,
      settings
    } = getState();
    const { httpClient, httpQueue } = await createHttpHandler(connection);
    const {
      endpoints
    } = features;
    if (filtered.length && (settings.node || settings.node.length !== 0)) {
      if (endpoints && endpoints.includes('/v1/chain/get_accounts_by_authorizers')) {
        const chunks = chunk(filtered, 10);
        return chunks.forEach((c) => {
          httpClient
            .post(`${connection.httpEndpoint}/v1/chain/get_accounts_by_authorizers`, {
              keys: c
            })
            .then((results) => {
              const accounts = results.data.accounts.map(a => a.account_name);
              dispatch(getAccounts(accounts, true));
              return dispatch({
                type: types.SYSTEM_ACCOUNT_BY_KEYS_SUCCESS,
                payload: results.data,
              });
            })
            .catch((err) => dispatch({
              type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
              payload: { err, chunk }
            }));
        });
      }
      dispatch({
        type: types.SYSTEM_ACCOUNT_BY_KEY_PENDING,
        payload: { filtered }
      });
      return filtered.forEach((key) =>
        eos(connection, false, true).rpc.history_get_key_accounts(key).then((accounts) => {
          dispatch(getAccounts(accounts.account_names, true));
          dispatch(getControlledAccounts(accounts.account_names));
          return dispatch({
            type: types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS,
            payload: { accounts }
          });
        }).catch((err) => dispatch({
          type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
          payload: { err, filtered }
        })));
    }
    return dispatch({
      type: types.SYSTEM_ACCOUNT_BY_KEY_FAILURE,
      payload: { filtered },
    });
  };
}

export function getControlledAccounts(accounts) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();
    accounts.forEach((account) => {
      eos(connection, false, true).rpc.history_get_controlled_accounts(account).then((results) => {
        dispatch(getAccounts(results.controlled_accounts, true));
        return dispatch({
          type: types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS,
          payload: { accounts: { account_names: results.controlled_accounts } }
        });
      });
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
    // Immediately fetch currently loaded account
    if (settings.account) {
      dispatch(getAccount(settings.account));
    }
    // Load any existing account data that matched our existing accounts
    const existingAccounts = Object.values(pick(accounts, chainAccounts));
    // Determine which accounts haven't been loaded into state
    const missingAccountDataFor = difference(chainAccounts, Object.keys(accounts));
    // Push placeholder into existingAccounts for the missing accounts.
    missingAccountDataFor.forEach((account) => {
      existingAccounts.push({
        account_name: account,
        head_block_num: 0,
      });
    });
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

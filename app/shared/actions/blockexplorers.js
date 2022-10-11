import sortBy from 'lodash/sortBy';

import * as types from './types';
import eos from './helpers/eos';

export function getBlockExplorers() {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_PENDING
    });
    // const { connection } = getState();
    // // Don't retrieve if we're not on mainnet
    // if (connection.chain !== 'eos-mainnet') {
    //   return dispatch({
    //     type: types.SYSTEM_BLOCKEXPLORERS_FAILURE
    //   });
    // }
    // const query = {
    //   json: true,
    //   code: 'blockexplorers',
    //   scope: 'blockexplorers',
    //   table: 'blockexplorers',
    //   limit: 100,
    // };

    const blockExplorerLists = {
      'eos-mainnet': [
        {
          name: 'bloks.io',
          patterns: {
            account: 'https://www.bloks.io/account/{account}',
            txid: 'https://www.bloks.io/transaction/{txid}'
          }
        },
        {
          name: 'eosflare.io',
          patterns: {
            account: 'https://eosflare.io/account/{account}',
            txid: 'https://eosflare.io/tx/{txid}'
          }
        },
        {
          name: 'eosmonitor.io',
          patterns: {
            account: 'https://eosmonitor.io/account/{account}',
            txid: 'https://eosmonitor.io/txn/{txid}'
          }
        },
        {
          name: 'eospark.com',
          patterns: {
            account: 'https://eospark.com/MainNet/account/{account}',
            txid: 'https://eospark.com/MainNet/tx/{txid}'
          }
        },
        {
          name: 'eosweb.net',
          patterns: {
            account: 'https://eosweb.net/account/{account}',
            txid: 'https://eosweb.net/transaction/{txid}'
          }
        },
        {
          name: 'eosx.io',
          patterns: {
            account: 'https://www.eosx.io/account/{account}',
            txid: 'https://www.eosx.io/tx/{txid}'
          }
        }
      ],
      'eos-testnet-jungle': [
        {
          name: 'bloks.io',
          patterns: {
            account: 'https://jungle.bloks.io/account/{account}',
            txid: 'https://jungle.bloks.io/transaction/{txid}'
          }
        },
      ],
      'eos-testnet-cryptokylin': [
        {
          name: 'bloks.io',
          patterns: {
            account: 'https://kylin.bloks.io/account/{account}',
            txid: 'https://kylin.bloks.io/transaction/{txid}'
          }
        },
      ],
      'bos-mainnet': [
        {
          name: 'bloks.io',
          patterns: {
            account: 'https://bos.bloks.io/account/{account}',
            txid: 'https://bos.bloks.io/transaction/{txid}'
          }
        },
      ],
      'beos-mainnet': [
        {
          name: 'explore.beos.world',
          patterns: {
            account: 'https://explore.beos.world/accounts/{account}',
            txid: 'https://explore.beos.world/transactions/{txid}'
          }
        }
      ],
      'beos-testnet': [
        {
          name: 'explore.testnet.beos.world',
          patterns: {
            account: 'https://explore.testnet.beos.world/accounts/{account}',
            txid: 'https://explore.testnet.beos.world/transactions/{txid}'
          }
        }
      ],
      'telos-mainnet': [
        {
          name: 'bloks.io',
          patterns: {
            account: 'https://telos.eosauthority.com/account/{account}',
            txid: 'https://telos.eosauthority.com/transaction/{txid}'
          }
        },
        {
          name: 'eosx.io',
          patterns: {
            account: 'https://telos.eosx.io/account/{account}',
            txid: 'https://telos.eosx.io/tx/{txid}'
          }
        }
      ],
      'telos-testnet': [
        {
          name: 'telos-test.bloks.io',
          patterns: {
            account: 'http://telos-test.bloks.io/account/{account}',
            txid: 'http://telos-test.bloks.io/transaction/{txid}'
          }
        },
        {
          name: 'eosx.io',
          patterns: {
            account: 'https://telos-test.eosx.io/account/{account}',
            txid: 'https://telos-test.eosx.io/tx/{txid}'
          }
        }
      ],
      'insights-mainnet': [
        {
          name: 'blockchain-tracker.insights.network',
          patterns: {
            account: 'https://blockchain-tracker.insights.network/accounts/{account}',
            txid: 'https://blockchain-tracker.insights.network/transactions/{txid}'
          }
        }
      ],
      'worbli-mainnet': [
        {
          name: 'bloks.io',
          patterns: {
            account: 'https://worbli.bloks.io/account/{account}',
            txid: 'https://worbli.bloks.io/transaction/{txid}'
          }
        },
      ],
      'wax-mainnet': [
        {
          name: 'bloks.io',
          patterns: {
            account: 'https://wax.bloks.io/account/{account}',
            txid: 'https://wax.bloks.io/transaction/{txid}'
          }
        },
      ],
      "libre-testnet": [
        {
          name: "testnet.libre.org/v2/explore",
          patterns: {
            account: "https://testnet.libre.org/v2/explore/account/{account}",
            txid: "https://testnet.libre.org/v2/explore/transaction/{txid}",
          },
        },
      ],
      "libre-mainnet": [
        {
          name: "lb.libre.org/v2/explore",
          patterns: {
            account: "https://lb.libre.org/v2/explore/account/{account}",
            txid: "https://lb.libre.org/v2/explore/transaction/{txid}",
          },
        },
      ]
    };


    // eos(connection, false, true).rpc.get_table_rows(query).then((results) => {
    //   const { rows } = results;

    const blockExplorers = {};

    Object.keys(blockExplorerLists).forEach((blockchainKey) => {
      sortBy(blockExplorerLists[blockchainKey], 'name').forEach((blockExplorer) => {
        blockExplorers[blockchainKey] = blockExplorers[blockchainKey] || {};
        blockExplorers[blockchainKey][blockExplorer.name] = blockExplorer.patterns;
      });
    });

    return dispatch({
      type: types.SYSTEM_BLOCKEXPLORERS_SUCCESS,
      payload: {
        blockExplorers
      }
    });
    // }).catch((err) => dispatch({
    //   type: types.SYSTEM_BLOCKEXPLORERS_FAILURE,
    //   payload: { err },
    // }));
  };
}

export default {
  getBlockExplorers
};

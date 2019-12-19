import { get, set } from 'dot-prop-immutable';

import * as types from './types';
import * as AccountActions from './accounts';
import eos from './helpers/eos';

import { delegatebwParams } from './system/delegatebw';

import EOSContract from '../utils/EOS/Contract';

export function createAccount(
  accountName,
  activeKey,
  delegatedBw,
  delegatedCpu,
  ownerKey,
  ramAmount,
  transferTokens
) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const { account, authorization } = settings;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_CREATEACCOUNT_PENDING
    });

    if (connection.chainSymbol === 'BEOS') {
      return eos(connection, true)
        .getAbi('eosio')
        .then((c) => {
          const contract = new EOSContract(c.abi, c.account_name);
          eos(connection, true, true).transact({
            actions: [
              {
                account: contract.account,
                name: 'newaccount',
                authorization: [{
                  actor: account,
                  permission: authorization
                }],
                data: {
                  creator: account,
                  name: accountName,
                  init_ram: true,
                  owner: {
                    threshold: 1,
                    keys: [{
                      key: ownerKey,
                      weight: 1
                    }],
                    accounts: [],
                    waits: []
                  },
                  active: {
                    threshold: 1,
                    keys: [{
                      key: activeKey,
                      weight: 1
                    }],
                    accounts: [],
                    waits: []
                  },
                },
              },
            ],
          }, {
            broadcast: connection.broadcast,
            expireSeconds: connection.expireSeconds,
            sign: connection.sign
          }).then(tx => {
            setTimeout(() => {
              dispatch(AccountActions.getAccount(account));
            }, 500);
            return dispatch({
              payload: {
                connection,
                tx
              },
              type: types.SYSTEM_CREATEACCOUNT_SUCCESS
            });
          }).catch((err) => {
            dispatch({
              payload: {
                connection,
                err
              },
              type: types.SYSTEM_CREATEACCOUNT_FAILURE
            });
          });
        })
        .catch((err) => {
          dispatch({
            payload: {
              connection,
              err
            },
            type: types.SYSTEM_CREATEACCOUNT_FAILURE
          });
        });
    }

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'newaccount',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            creator: account,
            name: accountName,
            owner: {
              threshold: 1,
              keys: [{
                key: ownerKey,
                weight: 1
              }],
              accounts: [],
              waits: []
            },
            active: {
              threshold: 1,
              keys: [{
                key: activeKey,
                weight: 1
              }],
              accounts: [],
              waits: []
            },
          },
        },
        {
          account: 'eosio',
          name: 'buyrambytes',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            payer: account,
            receiver: accountName,
            bytes: Number(ramAmount)
          },
        },
        {
          account: 'eosio',
          name: 'delegatebw',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: delegatebwParams(
            connection.chainSymbol,
            account,
            accountName,
            delegatedBw.split(' ')[0],
            delegatedCpu.split(' ')[0],
            transferTokens,
            connection.tokenPrecision
          ),
        },
      ],
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => {
      // Hack for account creation - able to remove with eosjs v20 upgrade
      let transaction = Object.assign({}, tx);
      const firstAction = get(tx, 'transaction.transaction.actions.0.name', 'newaccount');
      const ownerAccounts = get(tx, 'transaction.transaction.actions.0.data.owner.accounts');
      const activeAccounts = get(tx, 'transaction.transaction.actions.0.data.active.accounts');
      if (firstAction === 'newaccount') {
        if (ownerAccounts && ownerAccounts.length > 0) {
          if (ownerAccounts[0].permission.actor === '' && ownerAccounts[0].permission.permission === '') {
            transaction = set(transaction, 'transaction.transaction.actions.0.data.owner.accounts', []);
            transaction = set(transaction, 'transaction.transaction.actions.0.data.owner.waits', []);
          }
        }
        if (activeAccounts && activeAccounts.length > 0) {
          if (activeAccounts[0].permission.actor === '' && activeAccounts[0].permission.permission === '') {
            transaction = set(transaction, 'transaction.transaction.actions.0.data.active.accounts', []);
            transaction = set(transaction, 'transaction.transaction.actions.0.data.active.waits', []);
          }
        }
      }
      setTimeout(() => {
        dispatch(AccountActions.getAccount(account));
      }, 500);
      return dispatch({
        payload: {
          connection,
          tx: transaction
        },
        type: types.SYSTEM_CREATEACCOUNT_SUCCESS
      });
    }).catch((err) => {
      dispatch({
        payload: {
          connection,
          err
        },
        type: types.SYSTEM_CREATEACCOUNT_FAILURE
      });
    });
  };
}

export default {
  createAccount
};

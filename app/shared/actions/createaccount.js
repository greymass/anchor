import { get, set } from 'dot-prop-immutable';

import * as types from './types';
import * as AccountActions from './accounts';
import eos from './helpers/eos';

import { delegatebwParams } from './system/delegatebw';
import contracts from './contracts';
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

    const currentAccount = settings.account;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_CREATEACCOUNT_PENDING
    });

    if (connection.chainSymbol === "BEOS") {
      return eos(connection, true)
        .getAbi('eosio')
        .then((c) => {
          const contract = new EOSContract(c.abi, c.account_name);
          eos(connection, true).contract(contract.account).then(({ newaccount }) => {
            newaccount(
              {
                creator: currentAccount,
                name: accountName,
                init_ram: 1,
                owner: ownerKey,
                active: activeKey
              },
              {
                broadcast: connection.broadcast,
                expireSeconds: connection.expireSeconds,
                sign: connection.sign
              }
            ).then(tx => {
              setTimeout(() => {
                dispatch(AccountActions.getAccount(currentAccount));
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

    return eos(connection, true).transaction(tr => {
        tr.newaccount({
          creator: currentAccount,
          name: accountName,
          owner: ownerKey,
          active: activeKey
        });

        tr.buyrambytes({
          payer: currentAccount,
          receiver: accountName,
          bytes: Number(ramAmount)
        });

        tr.delegatebw(delegatebwParams(
          connection.chainSymbol,
          currentAccount,
          accountName,
          delegatedBw.split(' ')[0],
          delegatedCpu.split(' ')[0],
          transferTokens,
          connection.tokenPrecision
        ));
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
        dispatch(AccountActions.getAccount(currentAccount));
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

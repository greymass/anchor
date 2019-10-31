import { Decimal } from 'decimal.js';
import { findIndex } from 'lodash';

import * as types from './types';

import { delegatebwParams } from './system/delegatebw';
import { undelegatebwParams } from './system/undelegatebw';

import * as AccountActions from './accounts';
import * as TableActions from './table';
import eos from './helpers/eos';
import checkForBeos from '../components/helpers/checkCurrentBlockchain';
import serializer from './helpers/serializeBytes';

export function setStake(accountName, netAmount, cpuAmount) {
  return (dispatch: () => void, getState) => {
    const {
      accounts,
      connection,
      tables,
      settings,
      jurisdictions
    } = getState();

    const currentAccount = accounts[settings.account];

    const delegations = tables &&
                        tables.eosio &&
                        tables.eosio[settings.account] &&
                        tables.eosio[settings.account].delband.rows;

    const {
      increaseInStake,
      decreaseInStake
    } = getStakeChanges(connection.chainSymbol || 'EOS', currentAccount, accountName, delegations, netAmount, cpuAmount);

    dispatch({
      payload: { connection },
      type: types.SYSTEM_STAKE_PENDING
    });

    const data = [];

    if (increaseInStake.netAmount > 0 || increaseInStake.cpuAmount > 0) {
      data.push({
        name: 'delegatebw',
        data: delegatebwParams(
          connection.chainSymbol,
          currentAccount.account_name,
          accountName,
          increaseInStake.netAmount,
          increaseInStake.cpuAmount
        )
      });
    }
    if (decreaseInStake.netAmount > 0 || decreaseInStake.cpuAmount > 0) {
      data.push({
        name: 'undelegatebw',
        data: undelegatebwParams(
          connection.chainSymbol,
          currentAccount.account_name,
          accountName,
          decreaseInStake.netAmount,
          decreaseInStake.cpuAmount
        )
      });
    }

    let serializedArray = [];
    if (checkForBeos(connection)) {
      const temp = jurisdictions.choosenJurisdictions.map(obj => obj.code);
      serializedArray = serializer.serialize(temp);
    }
    console.log(data);
    if (data.length > 0) {
      eos(connection, true).transaction({
        actions: [{
          account: 'eosio',
          name: data[0].name,
          authorization: [{
            actor: currentAccount.account_name,
            permission: 'active'
          }],
          data: data[0].data
        }],
        transaction_extensions: serializedArray
      }, {
        broadcast: connection.broadcast,
        expireInSeconds: connection.expireInSeconds,
        sign: connection.sign
      }).then((tx) => {
        if (data.length > 1) {
          eos(connection, true).transaction({
            actions: [{
              account: 'eosio',
              name: data[1].name,
              authorization: [{
                actor: currentAccount.account_name,
                permission: 'active'
              }],
              data: data[1].data
            }],
            transaction_extensions: serializedArray
          }, {
            broadcast: connection.broadcast,
            expireInSeconds: connection.expireInSeconds,
            sign: connection.sign
          }).then((tx2) => {
            setTimeout(() => {
              if (accountName === settings.account) {
                dispatch(AccountActions.getAccount(accountName));
              }

              dispatch(TableActions.getTable('eosio', settings.account, 'delband'));
            }, 500);

            return dispatch({
              payload: {
                connection,
                tx
              },
              type: types.SYSTEM_STAKE_SUCCESS
            });
          }).catch((err) => {
            dispatch({
              payload: {
                connection,
                err
              },
              type: types.SYSTEM_STAKE_FAILURE
            });
          });
        } else {
          setTimeout(() => {
            if (accountName === settings.account) {
              dispatch(AccountActions.getAccount(accountName));
            }

            dispatch(TableActions.getTable('eosio', settings.account, 'delband'));
          }, 500);

          return dispatch({
            payload: {
              connection,
              tx
            },
            type: types.SYSTEM_STAKE_SUCCESS
          });
        }
      }).catch((err) => {
        dispatch({
          payload: {
            connection,
            err
          },
          type: types.SYSTEM_STAKE_FAILURE
        });
      });
    }
  };
}

export function resetStakeForm() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_SYSTEM_STATES
    });
  };
}

function getStakeChanges(chainSymbol, currentAccount, accountName, delegations, nextNetAmount, nextCpuAmount) {
  let accountResources;

  if (accountName !== currentAccount.account_name) {
    const index = findIndex(delegations, { to: accountName });

    if (index === -1) {
      accountResources = { cpu_weight: `0 ${chainSymbol}`, net_weight: `0 ${chainSymbol}` };
    } else {
      accountResources = delegations[index];
    }
  }

  const {
    cpu_weight,
    net_weight
  } = accountResources || currentAccount.self_delegated_bandwidth;

  const currentCpuAmount = new Decimal(String(cpu_weight).split(' ')[0]);
  const currentNetAmount = new Decimal(String(net_weight).split(' ')[0]);

  const increaseInStake = {
    netAmount: Math.max(0, (nextNetAmount - currentNetAmount)),
    cpuAmount: Math.max(0, (nextCpuAmount - currentCpuAmount))
  };

  const decreaseInStake = {
    netAmount: Math.max(0, (currentNetAmount - nextNetAmount)),
    cpuAmount: Math.max(0, (currentCpuAmount - nextCpuAmount))
  };

  return {
    increaseInStake,
    decreaseInStake
  };
}

export default {
  resetStakeForm,
  setStake
};

import { Decimal } from 'decimal.js';

import * as types from './types';

import { delegatebwParams } from './system/delegatebw';
import { undelegatebwParams } from './system/undelegatebw';

import * as AccountActions from './accounts';
import eos from './helpers/eos';

export function setStake(account, netAmount, cpuAmount) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();

    const {
      increaseInStake,
      decreaseInStake
    } = getStakeChanges(account, netAmount, cpuAmount);

    dispatch({ type: types.SYSTEM_STAKE_PENDING });
    return eos(connection, true).transaction(tr => {
      if (increaseInStake.netAmount > 0 || increaseInStake.cpuAmount > 0) {
        tr.delegatebw(delegatebwParams(
          account.account_name,
          account.account_name,
          increaseInStake.netAmount,
          increaseInStake.cpuAmount,
          0,
          connection
        ));
      }
      if (decreaseInStake.netAmount > 0 || decreaseInStake.cpuAmount > 0) {
        tr.undelegatebw(undelegatebwParams(
          account.account_name,
          account.account_name,
          decreaseInStake.netAmount,
          decreaseInStake.cpuAmount,
          connection
        ));
      }
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(AccountActions.getAccount(account.account_name));
      }, 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_STAKE_SUCCESS
      });
    }).catch((err) => {
      dispatch({
        payload: { err },
        type: types.SYSTEM_STAKE_FAILURE
      });
    });
  };
}

export function resetStakeForm() {
  return (dispatch: () => void) => {
    dispatch({
      type: types.RESET_SYSTEM_STATES
    });
  };
}

function getStakeChanges(account, nextNetAmount, nextCpuAmount) {
  const {
    cpu_weight,
    net_weight
  } = account.self_delegated_bandwidth;

  const currentCpuAmount = new Decimal(cpu_weight.split(' ')[0]);
  const currentNetAmount = new Decimal(net_weight.split(' ')[0]);

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

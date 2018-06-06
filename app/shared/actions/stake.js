import * as validate from './validate';
import * as types from './types';

import { delegatebw } from './system/delegatebw';
import { undelegatebw } from './system/undelegatebw';

export function setStakeWithValidation(EOSbalance, account, netAmount, cpuAmount) {
  return (dispatch: () => void) => {
    const { nextStake, currentStake } = getNextAndCurrentStake(account, netAmount, cpuAmount);

    if (dispatch(validate.validateStake(nextStake, currentStake, EOSbalance))) {
      const increaseInStake = {
        netAmount: Math.max(0, (nextStake.netAmount - currentStake.netAmount)),
        cpuAmount: Math.max(0, (nextStake.cpuAmount - currentStake.cpuAmount))
      };

      const decreaseInStake = {
        netAmount: Math.max(0, (currentStake.netAmount - nextStake.netAmount)),
        cpuAmount: Math.max(0, (currentStake.cpuAmount - nextStake.cpuAmount))
      };

      if (increaseInStake.netAmount > 0 || increaseInStake.cpuAmount > 0) {
        dispatch(delegatebw(
          account.account_name,
          account.account_name,
          increaseInStake.netAmount,
          increaseInStake.cpuAmount
        ));
      }
      if (decreaseInStake.netAmount > 0 || decreaseInStake.cpuAmount > 0) {
        dispatch(undelegatebw(
          account.account_name,
          account.account_name,
          decreaseInStake.netAmount,
          decreaseInStake.cpuAmount
        ));
      }
    }
  };
}

export function setStakeConfirmingWithValidation(EOSbalance, account, netAmount, cpuAmount) {
  return (dispatch: () => void) => {
    const { nextStake, currentStake } = getNextAndCurrentStake(account, netAmount, cpuAmount);

    if (dispatch(validate.validateStake(nextStake, currentStake, EOSbalance))) {
      return dispatch({ type: types.VALIDATE_STAKE_CONFIRMING });
    }
  };
}

export function resetStakeForm() {
  return (dispatch: () => void) => {
    dispatch({ type: types.SYSTEM_UNDELEGATEBW_NULL });
    dispatch({ type: types.SYSTEM_DELEGATEBW_NULL });
    return dispatch({ type: types.VALIDATE_STAKE_NULL });
  };
}

function getNextAndCurrentStake(account, netAmount, cpuAmount) {
  const nextStake = {
    netAmount,
    cpuAmount
  };
  const {
    cpu_weight,
    net_weight
  } = account.total_resources;

  const currentStake = {
    cpuAmount: parseFloat(net_weight),
    netAmount: parseFloat(cpu_weight)
  };

  return {
    nextStake,
    currentStake
  };
}

export default {
  resetStakeForm,
  setStakeWithValidation,
  setStakeConfirmingWithValidation
};

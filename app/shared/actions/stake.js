import * as validate from './validate';
import * as types from './types';

import {delegatebw} from './system/delegatebw';
import {undelegatebw} from './system/undelegatebw';

export function setStakeWithValidation(EOSbalance, account, net_amount, cpu_amount) {
  return (dispatch: () => void) => {
    const { nextStake, currentStake } = getNextAndCurrentStake(account, net_amount, cpu_amount);

    if (dispatch(validate.validateStake(nextStake, currentStake, EOSbalance))) {
      const increaseInStake = {
        net_amount: Math.max(0, (nextStake.net_amount - currentStake.net_amount)),
        cpu_amount: Math.max(0, (nextStake.cpu_amount - currentStake.cpu_amount))
      }

      const decreaseInStake = {
        net_amount: Math.max(0, (currentStake.net_amount - nextStake.net_amount)),
        cpu_amount: Math.max(0, (currentStake.cpu_amount - nextStake.cpu_amount))
      }

      if (increaseInStake.net_amount > 0 || increaseInStake.cpu_amount > 0){
        dispatch(delegatebw(account.account_name, account.account_name, increaseInStake.net_amount, increaseInStake.cpu_amount));
      }
      if (decreaseInStake.net_amount > 0 || decreaseInStake.cpu_amount > 0){
        dispatch(undelegatebw(account.account_name, account.account_name, decreaseInStake.net_amount, decreaseInStake.cpu_amount));
      }
    }
  };
}

export function setStakeConfirmingWithValidation(EOSbalance, account, net_amount, cpu_amount) {
  return (dispatch: () => void) => {
    const { nextStake, currentStake } = getNextAndCurrentStake(account, net_amount, cpu_amount);

    if (dispatch(validate.validateStake(nextStake, currentStake, EOSbalance))) {
      return dispatch({ type: types.VALIDATE_STAKE_CONFIRMING });
    }
  };
}

export function resetStakeForm() {
  return (dispatch: () => void) => {
    dispatch({type: types.SYSTEM_UNDELEGATEBW_NULL});
    dispatch({type: types.SYSTEM_DELEGATEBW_NULL});
    return dispatch({ type: types.VALIDATE_STAKE_NULL });
  };
}

function getNextAndCurrentStake(account, net_amount, cpu_amount) {
  const nextStake = {
    net_amount: net_amount,
    cpu_amount: cpu_amount
  }

  const currentStake = {
    net_amount: (account.coins_staked_to_net),
    cpu_amount: (account.coins_staked_to_cpu)
  }

  return {
    nextStake: nextStake,
    currentStake: currentStake
  }
}

export default {
  resetStakeForm,
  setStakeWithValidation,
  setStakeConfirmingWithValidation
};

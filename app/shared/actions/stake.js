import * as validate from './validate';
import * as types from './types';

import {delegatebw} from './system/delegatebw';

export function setStakeWithValidation(balance, account, net_amount, cpu_amount) {
  return (dispatch: () => void) => {
    const { nextStake, currentStake } = this.getNextAndCurrentStake(account, net_amount, cpu_amount);

    if (dispatch(validate.validateStake(nextStake, currentStake, balance))) {
      increaseInStake = {
        net_amount: Math.max(0, (nextStake.net_amount - currentStake.net_amount)),
        cpu_amount: Math.max(0, (nextStake.net_amount - currentStake.net_amount))
      }

      decreaseInStake = {
        net_amount: Math.max(0, (currentStake.net_amount - nextStake.net_amount)),
        cpu_amount: Math.max(0, (currentStake.net_amount - nextStake.net_amount))
      }
      if (increaseInStake.net_amount + increaseInStake.cpu_amount > 0){
        dispatch(delegatebw(account.account_name, account.account_name, increaseInStake.net_amount, increaseInStake.cpu_amount));
      }
      if (decreaseInStake.net_amount + increaseInStake.cpu_amount > 0){
        dispatch(delegatebw(account.account_name, account.account_name, decreaseInStake.net_amount, decreaseInStake.cpu_amount));
      }
    }
  };
}

export function resetStakeForm() {
  return (dispatch: () => void) => {
    return dispatch({ type: types.VALIDATE_STAKE_NULL });
  };
}

export function setStakeConfirmingWithValidation(balance, account, net_amount, cpu_amount) {
  return (dispatch: () => void) => {
    const { nextStake, currentStake } = this.getNextAndCurrentStake(account, net_amount, cpu_amount);

    if (dispatch(validate.validateStake(nextStake, currentStake, balance))) {
      return dispatch({ type: types.VALIDATE_STAKE_CONFIRMING });
    }
  };
}

function getNextAndCurrentStake(account, net_amount, cpu_amount) {
  const nextStake = {
    net_amount: net_amount,
    cpu_amount: cpu_amount
  }

  const currentStake = {
    net_amount: (account.net_amount/10000),
    cpu_amount: (account.cpu_amount/10000)
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

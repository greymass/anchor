import * as validate from './validate';
import * as types from './types';

import {delegatebw} from './system/delegatebw';

export function setStakeWithValidation(balance, account, net_amount, cpu_amount) {
  return (dispatch: () => void) => {
    const nextStake = stakeFromParams(account, net_amount, cpu_amount)

    setTimeout(function(){
      dispatch({type: types.VALIDATE_STAKE_NULL})
    }, 15000);


    if (dispatch(validate.validateStake(nextStake, balance))) {
      return dispatch(delegatebw(account.account_name, account.account_name, net_amount, cpu_amount));
    }
  };
}

export function setConfirmingWithValidation(balance, account, net_amount, cpu_amount) {
  return (dispatch: () => void) => {
    const nextStake = stakeFromParams(account, net_amount, cpu_amount)

    if (dispatch(validate.validateStake(nextStake, balance))) {
      return dispatch({ type: types.VALIDATE_STAKE_CONFIRMING });
    }
  };
}

function stakeFromParams(account, net_amount, cpu_amount){
  return {
    net_amount: (net_amount + account.net_weight/10000),
    cpu_amount: (cpu_amount + account.cpu_weight/10000)
  };
}

export default {
  setStakeWithValidation,
  setConfirmingWithValidation
};

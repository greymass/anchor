import * as validate from './validate';
import * as types from './types';

export function setStake(key, value) {
  return (dispatch: () => void) => {
    dispatch({
      type: types.SET_STAKE,
      payload: {
        [key]: value
      }
    });
  };
}

export function setStakeWithValidation(balance, net_amount, cpu_amount) {
  return (dispatch: () => void) => {
    try{
      const nextStake = {
        net_amount: net_amount,
        cpu_amount: cpu_amount
      };

      if (dispatch(validate.validateStake(nextStake, balance))){
        const err = new Error("Staking call hasn't been setup yet.");
        throw(err);

        // Add code to update staking amount on Blockchain
        // return dispatch({
        //   type: types.SET_STAKE,
        //   payload: {
        //     net_amount: net_amount,
        //     cpu_amount: cpu_amount
        //   }
        // });
      }

      
    } catch (err) {
      return dispatch({
        payload: {error: err.message },
        type: types.VALIDATE_STAKE_FAILURE
      })
    }
  };
}

export default {
  setStake,
  setStakeWithValidation
};

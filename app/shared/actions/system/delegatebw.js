import * as types from '../types';

import eos from '../helpers/eos';

export function delegatebw(delegator, receiver, net_quantity, cpu_quantity) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.VALIDATE_STAKE_PENDING
    })

    eos(connection).transaction(tr => {
      debugger
      tr.delegatebw({
        from: delegator,
        receiver: receiver,
        stake_net_quantity: (parseFloat(net_quantity)*10000),
        stake_cpu_quantity: (parseFloat(cpu_quantity)*10000),
        transfer: 0
      });
    }).then((result) => {
      return dispatch({
        type: types.VALIDATE_STAKE_SUCCESS
      })
    }).catch((error) => {
      return dispatch({
        payload: {error: err.message },
        type: types.VALIDATE_STAKE_FAILURE
      })
    })
  };
}

export default {
  delegatebw
};

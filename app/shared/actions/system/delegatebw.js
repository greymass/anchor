import * as types from '../types';

import eos from '../helpers/eos';

export function delegatebw(delegator, receiver, net_amount, cpu_amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();

    dispatch({
      type: types.VALIDATE_STAKE_PENDING
    })

    const stake_net_amount = parseFloat(net_amount || 0).toPrecision(5);
    const stake_cpu_amount = parseFloat(cpu_amount || 0).toPrecision(5);

    eos(connection).transaction(tr => {
      tr.delegatebw({
        from: delegator,
        receiver,
        stake_net_quantity: `${stake_net_amount} EOS`,
        stake_cpu_quantity: `${stake_cpu_amount} EOS`,
        transfer: 0
      });
    }).then(() => dispatch({
      type: types.VALIDATE_STAKE_SUCCESS
    })).catch((err) => dispatch({
      payload: { error: err.message },
      type: types.VALIDATE_STAKE_FAILURE
    }));
  };
}

export default {
  delegatebw
};

import * as types from '../types';

import eos from '../helpers/eos';

export function delegatebw(delegator, receiver, net_amount, cpu_amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_DELEGATEBW_PENDING
    })

    const stake_net_amount = parseFloat(net_amount || 0).toPrecision(5);
    const stake_cpu_amount = parseFloat(cpu_amount || 0).toPrecision(5);

    return eos(connection).transaction(tr => {
      tr.delegatebw({
        from: delegator,
        receiver,
        stake_net_quantity: `${stake_net_amount} EOS`,
        stake_cpu_quantity: `${stake_cpu_amount} EOS`,
        transfer: 0
      });
    }).then((tx) => dispatch({
      payload: { tx },
      type: types.SYSTEM_DELEGATEBW_SUCCESS
    })).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_DELEGATEBW_FAILURE
    }));
  };
}

export default {
  delegatebw
};

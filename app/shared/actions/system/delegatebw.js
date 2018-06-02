import * as types from '../types';

import eos from '../helpers/eos';

export function delegatebw(delegator, receiver, netAmount, cpuAmount) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_DELEGATEBW_PENDING
    });

    const stakeNetAmount = parseFloat(netAmount || 0).toPrecision(5);
    const stakeCpuAmount = parseFloat(cpuAmount || 0).toPrecision(5);

    return eos(connection).transaction(tr => {
      tr.delegatebw({
        from: delegator,
        receiver,
        stake_net_quantity: `${stakeNetAmount} EOS`,
        stake_cpu_quantity: `${stakeCpuAmount} EOS`,
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

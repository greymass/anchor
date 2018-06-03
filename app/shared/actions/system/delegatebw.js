import * as types from '../types';
import * as AccountActions from '../accounts';
import eos from '../helpers/eos';

export function delegatebw(delegator, receiver, netAmount, cpuAmount) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_DELEGATEBW_PENDING
    });

    const stakeNetAmount = netAmount || 0;
    const stakeCpuAmount = cpuAmount || 0;

    return eos(connection).transaction(tr => {
      tr.delegatebw({
        from: delegator,
        receiver,
        stake_net_quantity: `${stakeNetAmount} EOS`,
        stake_cpu_quantity: `${stakeCpuAmount} EOS`,
        transfer: 0
      });
    }).then((tx) => {
      dispatch(AccountActions.getAccount(delegator));
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_DELEGATEBW_SUCCESS
      })
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_DELEGATEBW_FAILURE
    }));
  };
}

export default {
  delegatebw
};

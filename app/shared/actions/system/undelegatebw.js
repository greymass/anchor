import * as types from '../types';
import * as AccountActions from '../accounts';
import eos from '../helpers/eos';

export function undelegatebw(delegator, receiver, netAmount, cpuAmount) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_UNDELEGATEBW_PENDING
    });

    const unstakeNetAmount = Math.round(netAmount * 10000) / 10000 || 0;
    const unstakeCpuAmount = Math.round(cpuAmount * 10000) / 10000 || 0;

    return eos(connection).transaction(tr => {
      tr.undelegatebw({
        from: delegator,
        receiver,
        unstake_net_quantity: `${unstakeNetAmount} EOS`,
        unstake_cpu_quantity: `${unstakeCpuAmount} EOS`,
        transfer: 0
      });
    }).then((tx) => {
      dispatch(AccountActions.getAccount(delegator));
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_UNDELEGATEBW_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UNDELEGATEBW_FAILURE
    }));
  };
}

export default {
  undelegatebw
};

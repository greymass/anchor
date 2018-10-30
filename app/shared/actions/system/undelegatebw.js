import * as types from '../types';
import * as AccountActions from '../accounts';
import eos from '../helpers/eos';

export function undelegatebw(delegator, receiver, netAmount, cpuAmount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      type: types.SYSTEM_UNDELEGATEBW_PENDING
    });

    return eos(connection, true).transaction(tr => {
      tr.undelegatebw(undelegatebwParams(delegator, receiver, netAmount, cpuAmount, settings));
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

export function undelegatebwParams(delegator, receiver, netAmount, cpuAmount, settings) {
  const unstakeNetAmount = parseFloat(netAmount) || 0;
  const unstakeCpuAmount = parseFloat(cpuAmount) || 0;

  return {
    from: delegator,
    receiver,
    unstake_net_quantity: `${unstakeNetAmount.toFixed(4)} ` + settings.blockchain.tokenSymbol,
    unstake_cpu_quantity: `${unstakeCpuAmount.toFixed(4)} ` + settings.blockchain.tokenSymbol,
    transfer: 0
  };
}

export default {
  undelegatebw,
  undelegatebwParams
};

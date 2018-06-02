import * as types from '../types';
import * as AccountActions from '../accounts';
import eos from '../helpers/eos';

export function undelegatebw(delegator, receiver, net_amount, cpu_amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_UNDELEGATEBW_PENDING
    })

    const unstake_net_amount = parseFloat(net_amount || 0).toPrecision(5);
    const unstake_cpu_amount = parseFloat(cpu_amount || 0).toPrecision(5);

    return eos(connection).transaction(tr => {
      tr.undelegatebw({
        from: delegator,
        receiver,
        unstake_net_quantity: `${unstake_net_amount} EOS`,
        unstake_cpu_quantity: `${unstake_cpu_amount} EOS`,
        transfer: 0
      });
    }).then((tx) => {
      dispatch(AccountActions.getAccount(delegator));
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_UNDELEGATEBW_SUCCESS
      })
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_UNDELEGATEBW_FAILURE
    }));
  };
}

export default {
  undelegatebw
};

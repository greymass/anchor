import * as types from '../types';
import * as AccountActions from '../accounts';
import eos from '../helpers/eos';

export function delegatebw(delegator, receiver, netAmount, cpuAmount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_DELEGATEBW_PENDING
    });

    const { account, authorization } = settings;

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'delegatebw',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: delegatebwParams(connection.chainSymbol || 'EOS', delegator, receiver, netAmount, cpuAmount, false, connection.tokenPrecision)
        }
      ],
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(AccountActions.getAccount(delegator));
        dispatch(AccountActions.getCurrencyBalance(delegator));
      }, 1000);
      return dispatch({
        payload: {
          connection,
          tx
        },
        type: types.SYSTEM_DELEGATEBW_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_DELEGATEBW_FAILURE
    }));
  };
}

export function delegatebwParams(chainSymbol, delegator, receiver, netAmount, cpuAmount, transferTokens, precision = 4) {
  const stakeNetAmount = parseFloat(netAmount) || 0;
  const stakeCpuAmount = parseFloat(cpuAmount) || 0;

  return {
    from: delegator,
    receiver,
    stake_net_quantity: `${stakeNetAmount.toFixed(precision)} ${chainSymbol}`,
    stake_cpu_quantity: `${stakeCpuAmount.toFixed(precision)} ${chainSymbol}`,
    transfer: !!transferTokens,
  };
}

export default {
  delegatebw
};

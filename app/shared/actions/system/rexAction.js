import { get, set } from 'dot-prop-immutable';

import * as types from '../types';
import eos from '../helpers/eos';

export function fund(data) {
  rexAction('fund', 'REX_FUND', data);
}

export function defund(data) {
  rexAction('defund', 'REX_DEFUND', data);
}

export function buyRex(data) {
  rexAction('buyRex', 'REX_BUY_REX', data);
}

export function sellRex(data) {
  rexAction('sellRex', 'REX_SELL_REX', data);
}

export function rentCpu(data) {
  rexAction('rentCpu', 'REX_RENT_CPU', data);
}

export function rentNet(data) {
  rexAction('rentNet', 'REX_RENT_NET', data);
}

function rexAction(actionName, actionVariable, data) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types[`SYSTEM_${actionVariable}_PENDING`]
    });

    const { account } = settings;
    const [, authorization] = connection.authorization.split('@');

    return eos(connection, true).transaction({
      actions: [
        {
          account: 'eosio',
          name: actionName,
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        // Get rex funds
        // dispatch(getBidForName(data.newname));
      }, 500);

      return dispatch({
        payload: { tx },
        type: types[`SYSTEM_${actionVariable}_SUCCESS`]
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types[`SYSTEM_${actionVariable}_FAILURE`]
    }));
  };
}

export default {
  fund,
  defund,
  buyRex,
  sellRex,
  rentCpu,
  rentNet
};

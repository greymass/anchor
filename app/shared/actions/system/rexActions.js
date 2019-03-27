import * as types from '../types';
import eos from '../helpers/eos';

export function fund(data) {
  return (dispatch: () => void, getState) => {
    rexActions('deposit', 'REX_FUND', data, dispatch, getState);
  };
}

export function defund(data) {
  return (dispatch: () => void, getState) => {
    rexActions('defund', 'REX_DEFUND', data, dispatch, getState);
  };
}

export function buyRex(data) {
  return (dispatch: () => void, getState) => {
    rexActions('buyRex', 'REX_BUY_REX', data, dispatch, getState);
  };
}

export function sellRex(data) {
  return (dispatch: () => void, getState) => {
    rexActions('sellRex', 'REX_SELL_REX', data, dispatch, getState);
  };
}

export function rentCpu(data) {
  return (dispatch: () => void, getState) => {
    rexActions('rentCpu', 'REX_RENT_CPU', data, dispatch, getState);
  };
}

export function rentNet(data) {
  return (dispatch: () => void, getState) => {
    rexActions('rentNet', 'REX_RENT_NET', data, dispatch, getState);
  };
}

function rexActions(actionName, actionVariable, data, dispatch, getState) {
  const {
    settings,
    connection
  } = getState();
  dispatch({
    type: types[`SYSTEM_${actionVariable}_PENDING`]
  });

  const { account } = settings;
  const [, authorization] = connection.authorization.split('@');
  console.log({data})
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
}

export default {
  fund,
  defund,
  buyRex,
  sellRex,
  rentCpu,
  rentNet
};

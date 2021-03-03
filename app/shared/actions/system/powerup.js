import { Asset } from '@greymass/eosio';

import * as types from '../types';
import eos from '../helpers/eos';

export function powerup(pstate, amount, resource, rentBoth = false) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();

    const data = {
      payer: settings.account,
      receiver: settings.account,
      days: Number(pstate.powerup_days),
      net_frac: 0,
      cpu_frac: 0,
      max_payment: String(amount)
    };

    const frac = pstate.cpu.frac(Asset.from(amount));
    const fracPrimary = Math.floor(frac * 0.95);
    const fracSecondary = Math.floor(frac * 0.05);

    switch (resource) {
      case 'net': {
        data.cpu_frac = (rentBoth) ? fracSecondary : 0;
        data.net_frac = (rentBoth) ? fracPrimary : frac;
        break;
      }
      default:
      case 'cpu': {
        data.cpu_frac = (rentBoth) ? fracPrimary : frac;
        data.net_frac = (rentBoth) ? fracSecondary : 0;
        break;
      }
    }

    dispatch({
      payload: { connection },
      type: types.SYSTEM_POWERUP_PENDING
    });

    const { account, authorization } = settings;

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'powerup',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => dispatch({
      payload: {
        connection,
        tx
      },
      type: types.SYSTEM_POWERUP_SUCCESS
    })).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_POWERUP_FAILURE
    }));
  };
}
export default {
  powerup,
};

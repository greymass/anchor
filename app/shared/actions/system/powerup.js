import { Asset } from '@greymass/eosio';

import * as types from '../types';
import eos from '../helpers/eos';

function powerup(sample, pstate, amount, resource, rentBoth = false) {
  return (dispatch: () => void, getState) => {
    const { connection, settings } = getState();

    const data = {
      payer: settings.account,
      receiver: settings.account,
      days: Number(pstate.powerup_days),
      net_frac: 0,
      cpu_frac: 0,
      max_payment: 0
    };

    const secondaryResource = (resource === 'cpu') ? 'net' : 'cpu';

    const price = pstate[resource].price_per(sample, amount * 1000);
    const frac = pstate[resource].frac(sample, amount * 1000);

    const sampleSize = 1000000000;
    const sampleSecondary = pstate[secondaryResource].price_per(sample, sampleSize);
    const amountSecondary = 0.0001 / (sampleSecondary / sampleSize);
    const fracSecondary = pstate[secondaryResource].frac(sample, amountSecondary);
    const priceSecondary = pstate[secondaryResource].price_per(sample, amountSecondary);

    if (rentBoth) {
      data.max_payment = String(Asset.from(price + priceSecondary, `${connection.tokenPrecision},${connection.chainSymbol}`));
    } else {
      data.max_payment = String(Asset.from(price, `${connection.tokenPrecision},${connection.chainSymbol}`));
    }

    switch (resource) {
      case 'net': {
        data.cpu_frac = (rentBoth) ? fracSecondary : 0;
        data.net_frac = frac;
        break;
      }
      default:
      case 'cpu': {
        data.cpu_frac = frac;
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
export {
  powerup,
};

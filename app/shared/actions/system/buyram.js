import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';
import serializer from '../helpers/serializeBytes';

export function buyram(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings,
      jurisdictions
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_BUYRAM_PENDING
    });

    let serializedArray = [];
    if (connection.chain === 'BEOS') {
      const temp = jurisdictions.choosenJurisdictions.map(obj => obj.code);
      serializedArray = serializer.serialize(temp);
    }

    const { account } = settings;
    return eos(connection, true).transaction({
      actions: [{
        account: 'eosio',
        name: 'buyram',
        authorization: [{
          actor: account,
          permission: 'active'
        }],
        data: {
          payer: account,
          receiver: account,
          quant: `${amount.toFixed(4)} ${connection.chainSymbol || 'EOS'}`
        }
      }],
      transaction_extensions: serializedArray
    }).then((tx) => {
      setTimeout(dispatch(getAccount(account)), 500);

      return dispatch({
        payload: {
          connection,
          tx
        },
        type: types.SYSTEM_BUYRAM_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_BUYRAM_FAILURE
    }));
  };
}

export default {
  buyram
};

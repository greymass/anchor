import * as types from '../types';

import { getAccount } from '../accounts';
import eos from '../helpers/eos';
import serializer from '../helpers/serializeBytes';
import checkForBeos from '../../components/helpers/checkCurrentBlockchain';

export function sellram(amount) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings,
      jurisdictions
    } = getState();

    dispatch({
      payload: { connection },
      type: types.SYSTEM_SELLRAM_PENDING
    });

    let serializedArray = [];
    if (checkForBeos(connection)) {
      const temp = jurisdictions.choosenJurisdictions.map(obj => obj.code);
      serializedArray = serializer.serialize(temp);
    }

    const { account } = settings;

    return eos(connection, true).transaction({
      actions: [{
        account: 'eosio',
        name: 'sellram',
        authorization: [{
          actor: account,
          permission: 'active'
        }],
        data: {
          account,
          bytes: Number(amount)
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
        type: types.SYSTEM_SELLRAM_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: {
        connection,
        err
      },
      type: types.SYSTEM_SELLRAM_FAILURE
    }));
  };
}

export default {
  sellram
};

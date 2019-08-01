import * as types from './types';

import eos from './helpers/eos';
import { getCurrencyBalance } from './accounts';
import toHexString from './helpers/serializeBytes';

export function transfer(from, to, quantity, memo, symbol) {
  return (dispatch: () => void, getState) => {
    const {
      balances,
      connection,
      jurisdictions
    } = getState();

    const temp = jurisdictions.choosenJurisdictions.map(obj => obj.code);
    const serializedArray = toHexString(temp);
    const currentSymbol = symbol || connection.chainSymbol || 'EOS';

    dispatch({
      payload: { connection },
      type: types.SYSTEM_TRANSFER_PENDING,
    });
    try {
      const contracts = balances.__contracts;
      const account = contracts[currentSymbol].contract;
      return eos(connection, true).transaction({
        actions: [{
          account,
          name: 'transfer',
          authorization: [{
            actor: from,
            permission: 'active'
          }],
          data: {
            from,
            to,
            quantity,
            memo
          }
        }],
        transaction_extensions: [{
          type: 0,
          data: serializedArray
        }]
      }, {
        broadcast: connection.broadcast,
        expireInSeconds: connection.expireInSeconds,
        sign: connection.sign
      }).then((tx) => {
        // If this is an offline transaction, also store the ABI
        if (!connection.sign && account !== 'eosio.token') {
          return eos(connection).getAbi(account).then((contract) =>
            dispatch({
              payload: {
                connection,
                contract,
                tx
              },
              type: types.SYSTEM_TRANSFER_SUCCESS
            }));
        }
        dispatch(getCurrencyBalance(from));
        return dispatch({
          payload: {
            connection,
            tx
          },
          type: types.SYSTEM_TRANSFER_SUCCESS
        });
      }).catch((err) => dispatch({
        payload: {
          connection,
          err
        },
        type: types.SYSTEM_TRANSFER_FAILURE
      }));
    } catch (err) {
      return dispatch({
        payload: {
          connection,
          err
        },
        type: types.SYSTEM_TRANSFER_FAILURE
      });
    }
  };
}

export default {
  transfer
};

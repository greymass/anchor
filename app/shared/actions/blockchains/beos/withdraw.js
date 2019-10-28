import {
  SYSTEM_TRANSFER_PENDING,
  SYSTEM_TRANSFER_SUCCESS,
  SYSTEM_TRANSFER_FAILURE
} from '../../types';

import EOSContract from '../../../utils/EOS/Contract';
import eos from '../../helpers/eos';
import { getCurrencyBalance } from '../../accounts';
import checkForBeos from '../../../components/helpers/checkCurrentBlockchain';
import serializer from '../../helpers/serializeBytes';

export function beoswithdraw(from, to, quantity, storeName) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      jurisdictions
    } = getState();

    let serializedArray = [];
    if (checkForBeos(connection)) {
      const temp = jurisdictions.choosenJurisdictions.map(obj => obj.code);
      serializedArray = serializer.serialize(temp);
    }

    if (!connection.supportedContracts || !connection.supportedContracts.includes('beosexchange')) {
      dispatch({ type: SYSTEM_TRANSFER_FAILURE });
    }

    dispatch({ type: SYSTEM_TRANSFER_PENDING });

    eos(connection, true).transaction({
      actions: [{
        account: 'beos.gateway',
        name: 'withdraw',
        authorization: [{
          actor: from,
          permission: 'active'
        }],
        data: {
          from,
          bts_to: to,
          quantity,
        }
      }],
      transaction_extensions: serializedArray
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then(tx => {
      dispatch(getCurrencyBalance(from));
      return dispatch({
        payload: { tx, connection },
        type: SYSTEM_TRANSFER_SUCCESS
      });
    })
      .catch(err => {
        dispatch({
          payload: { err },
          type: SYSTEM_TRANSFER_FAILURE
        });
      });
  };
}

export default { beoswithdraw };

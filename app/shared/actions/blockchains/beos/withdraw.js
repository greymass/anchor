import {
  SYSTEM_BEOSWITHDRAW_PENDING,
  SYSTEM_BEOSWITHDRAW_SUCCESS,
  SYSTEM_BEOSWITHDRAW_FAILURE
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
      balances,
      jurisdictions
    } = getState();

    let serializedArray = [];
    if (checkForBeos(connection)) {
      const temp = jurisdictions.choosenJurisdictions.map(obj => obj.code);
      serializedArray = serializer.serialize(temp);
    }
    const currentSymbol = connection.chainSymbol || 'EOS';

    if (!connection.supportedContracts || !connection.supportedContracts.includes('beosexchange')) {
      dispatch({ type: SYSTEM_BEOSWITHDRAW_FAILURE });
    }

    dispatch({ type: SYSTEM_BEOSWITHDRAW_PENDING });

    const contracts = balances.__contracts;
    const account = contracts[currentSymbol].contract;

    eos(connection, true).getAbi(storeName)
      .then((c) => {
        const contract = new EOSContract(c.abi, c.account_name);
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
          broadcast: true,
          expireInSeconds: connection.expireInSeconds,
          sign: connection.sign
        }).then(tx => {
          dispatch(getCurrencyBalance(from));
          return dispatch({
            payload: { tx, connection },
            type: SYSTEM_BEOSWITHDRAW_SUCCESS
          });
        })
        .catch(err => {
          dispatch({
            payload: { err },
            type: SYSTEM_BEOSWITHDRAW_FAILURE
          });
        });
    });
  };
}

export default { beoswithdraw };

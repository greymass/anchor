import {
  SYSTEM_BEOSWITHDRAW_PENDING,
  SYSTEM_BEOSWITHDRAW_SUCCESS,
  SYSTEM_BEOSWITHDRAW_FAILURE
} from '../../types';

import EOSContract from '../../../utils/EOS/Contract';
import eos from '../../helpers/eos';
import { getCurrencyBalance } from '../../accounts';

export function beoswithdraw(from, to, quantity, storeName) {
  return (dispatch: () => void, getState) => {
    const {
      connection: { supportedContracts }
    } = getState();

    if (!supportedContracts || !supportedContracts.includes('beosexchange')) {
      dispatch({ type: SYSTEM_BEOSWITHDRAW_FAILURE });
    }

    dispatch({ type: SYSTEM_BEOSWITHDRAW_PENDING });

    const { connection } = getState();

    eos(connection, true).getAbi(storeName)
      .then((c) => {
        const contract = new EOSContract(c.abi, c.account_name);
        eos(connection, true)
          .contract(contract.account)
          .then(({ withdraw }) => {
            withdraw(
              { from, bts_to: to, quantity },
              {
                broadcast: true,
                sign: connection.sign
              }
            )
              .then(tx => {
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
          })
          .catch(err => {
            dispatch({
              payload: { err },
              type: SYSTEM_BEOSWITHDRAW_FAILURE
            });
          });
      }).catch(err => {
        dispatch({
          payload: { err },
          type: SYSTEM_BEOSWITHDRAW_FAILURE
        });
      });
  };
}

export default { beoswithdraw };

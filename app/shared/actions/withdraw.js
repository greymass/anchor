import {
  SYSTEM_WITHDRAW_PENDING,
  SYSTEM_WITHDRAW_SUCCESS,
  SYSTEM_WITHDRAW_FAILURE
} from "./types";

import EOSContract from "../utils/EOS/Contract";
import eos from "./helpers/eos";
import { getAbi } from "./contracts";
import { getCurrencyBalance } from "./accounts";

export function withdraw(from, to, quantity, storeName) {
  return (dispatch: () => void, getState) => {
    const {
      connection: { supportedContracts }
    } = getState();

    if (!supportedContracts || !supportedContracts.includes("withdraw")) {
      dispatch({ type: SYSTEM_WITHDRAW_FAILURE });
    }

    dispatch(getAbi(storeName));
    dispatch({ type: SYSTEM_WITHDRAW_PENDING });

    const {
      contracts: { [storeName]: c },
      connection
    } = getState();
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
          .then(trx => {
            dispatch(getCurrencyBalance(from));
            return dispatch({
              payload: { trx },
              type: SYSTEM_WITHDRAW_SUCCESS
            });
          })
          .catch(err => {
            dispatch({
              payload: { err },
              type: SYSTEM_WITHDRAW_FAILURE
            });
          });
      })
      .catch(err => {
        dispatch({
          payload: { err },
          type: SYSTEM_WITHDRAW_FAILURE
        });
      });
  };
}

export default { withdraw };

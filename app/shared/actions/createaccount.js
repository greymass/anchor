import { Decimal } from 'decimal.js';

import * as types from './types';

import * as AccountActions from './accounts';
import eos from './helpers/eos';

export function createAccount(accountName, publicKey, ramAmount, delegatedResources) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const currentAccount = settings.account;

    dispatch({ type: types.SYSTEM_CREATEACCOUNT_PENDING });

    return eos.transaction(tr => {
      tr.newaccount({
        creator: currentAccount,
        name: accountName,
        owner: publicKey,
        active: publicKey
      });

      tr.buyrambytes({
        payer: currentAccount,
        receiver: accountName,
        bytes: ramAmount
      });

      tr.delegatebw({
        from: currentAccount,
        receiver: accountName,
        stake_net_quantity: Decimal(delegatedResources).dividedBy(2),
        stake_cpu_quantity: Decimal(delegatedResources).dividedBy(2),
        transfer: 0
      });
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(AccountActions.getAccount(currentAccount));
      }, 500);
      return dispatch({
        payload: { tx },
        type: types.SYSTEM_CREATEACCOUNT_SUCCESS
      });
    }).catch((err) => {
      dispatch({
        payload: { err },
        type: types.SYSTEM_CREATEACCOUNT_FAILURE
      });
    });
  };
}

export default {
  createAccount
};

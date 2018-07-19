import { Decimal } from 'decimal.js';

import * as types from './types';
import * as AccountActions from './accounts';
import eos from './helpers/eos';

import { delegatebwParams } from './system/delegatebw';

export function createAccount(accountName, publicKey, ramAmount, delegatedResources) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const currentAccount = settings.account;

    dispatch({ type: types.SYSTEM_CREATEACCOUNT_PENDING });

    return eos(connection).transaction(tr => {
      tr.newaccount({
        creator: currentAccount,
        name: accountName,
        owner: publicKey,
        active: publicKey
      });

      tr.buyrambytes({
        payer: currentAccount,
        receiver: accountName,
        bytes: Number(ramAmount)
      });

      const halfOfDelegatedResources = Decimal(delegatedResources.split(' ')[0]).dividedBy(2);

      tr.delegatebw(delegatebwParams(
        currentAccount,
        accountName,
        halfOfDelegatedResources,
        halfOfDelegatedResources
      ));
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

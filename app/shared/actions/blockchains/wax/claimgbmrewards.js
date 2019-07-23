import { get, set } from 'dot-prop-immutable';

import * as types from './types';
import * as AccountActions from './accounts';
import eos from './helpers/eos';

import { delegatebwParams } from './system/delegatebw';
import contracts from './contracts';
import EOSContract from '../utils/EOS/Contract';

export function claimgbmrewards(owner) {
  return (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const currentAccount = settings.account;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_WAX_CLAIMGBMREWARDS_PENDING
    });

    return eos(connection, true).transaction(tr => {
      tr.claimgbmvote({
        owner: currentAccount,
      });

      tr.claimgenesis({
        claimer: currentAccount,
      });
    }, {
      broadcast: connection.broadcast,
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(AccountActions.getCurrencyBalance(currentAccount));
      }, 500);
      return dispatch({
        payload: {
          connection,
          tx
        },
        type: types.SYSTEM_WAX_CLAIMGBMREWARDS_SUCCESS
      });
    }).catch((err) => {
      dispatch({
        payload: {
          connection,
          err
        },
        type: types.SYSTEM_WAX_CLAIMGBMREWARDS_FAILURE
      });
    });
  };
}

export default {
  claimgbmrewards
};

import * as types from '../../types';
import * as AccountActions from '../../accounts';
import eos from '../../helpers/eos';

export function claimgbmrewards() {
  return async (dispatch: () => void, getState) => {
    const {
      connection,
      settings
    } = getState();

    const currentAccount = settings.account;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_WAX_CLAIMGBMREWARDS_PENDING
    });

    const { account, authorization } = settings;

    return eos(connection, true, true).transact({
      actions: [
        {
          account: 'eosio',
          name: 'claimgbmvote',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            owner: currentAccount
          }
        },
        {
          account: 'eosio',
          name: 'claimgenesis',
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: {
            claimer: currentAccount
          }
        },
      ]
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => {
      setTimeout(() => {
        dispatch(AccountActions.getAccount(currentAccount));
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

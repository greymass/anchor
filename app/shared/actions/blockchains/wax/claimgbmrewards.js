import * as types from '../../types';
import * as AccountActions from '../../accounts';
import eos from '../../helpers/eos';

export function claimgbmrewards() {
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

    const { account } = settings;
    const [, authorization] = connection.authorization.split('@');

    return eos(connection, true).transaction({
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

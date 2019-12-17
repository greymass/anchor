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

    const { account } = settings;
    const [, authorization] = connection.authorization.split('@');

    const eosobj = eos(connection, true, true);
    let method = 'transact';
    let params = {
      blocksBehind: 3,
      expireSeconds: 30,
    };
    let contract;
    if (!eosobj[method]) {
      contract = await eosobj.getAbi('eosio');
      if (contract
        && contract.account_name
        && contract.abi
      ) {
        eosobj.fc.abiCache.abi(contract.account_name, contract.abi);
      }
      method = 'transaction';
      params = {
        broadcast: connection.broadcast,
        expireSeconds: connection.expireSeconds,
        sign: connection.sign
      };
    }

    return eosobj[method]({
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
    }, params).then((tx) => {
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

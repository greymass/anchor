import * as types from "../types";

import { getAccount } from "../accounts";
import eos from "../helpers/eos";
import { createHttpHandler } from "../../utils/http/handler";

async function getAction(
  connection,
  account,
  authorization,
  permission,
  parent,
  auth,
  network = 'EOS',
  wallet = null
) {
  const action = {
    account: 'eosio',
    name: 'updateauth',
    authorization: [
      {
        actor: account,
        permission: authorization
      }
    ],
    data: {
      account,
      permission,
      parent,
      auth
    }
  };
  // Modify transaction for FIO
  if (network === 'FIO') {
    const { httpClient } = await createHttpHandler(connection);
    const fees = await httpClient.post(
      `${connection.httpEndpoint}/v1/chain/get_fee`,
      {
        end_point: 'auth_update',
        fio_address: wallet.address
      }
    );
    const { fee } = fees.data;
    action.data = {
      account,
      permission,
      parent,
      auth,
      max_fee: fee
      // tpid: "tpid@greymass"
    };
  }
  return action;
}

function updateauth(
  permission,
  parent,
  auth,
  authorizationOverride = false
) {
  return async (dispatch: () => void, getState) => {
    const { connection, settings, wallet } = getState();
    const { account, authorization } = settings;

    dispatch({
      payload: { connection },
      type: types.SYSTEM_UPDATEAUTH_PENDING
    });

    const actions = [
      await getAction(
        connection,
        account,
        authorization,
        permission,
        parent,
        auth,
        connection.keyPrefix,
        wallet
      )
    ];
    return eos(connection, true, true)
      .transact(
        { actions },
        {
          broadcast: connection.broadcast,
          expireSeconds: connection.expireSeconds,
          sign: connection.sign
        }
      )
      .then(tx => {
        // Refresh the account
        setTimeout(dispatch(getAccount(account)), 500);
        return dispatch({
          payload: {
            connection,
            tx
          },
          type: types.SYSTEM_UPDATEAUTH_SUCCESS
        });
      })
      .catch(err => dispatch({
        payload: {
          connection,
          err
        },
        type: types.SYSTEM_UPDATEAUTH_FAILURE
      }));
  };
}

export {
  updateauth
};

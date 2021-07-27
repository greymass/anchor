import * as types from '../types';
import eos from '../helpers/eos';
import { getTable } from '../table';

const blackListedMethodAttributes = ['to', 'from'];
const whiteListedMethods = ['claim', 'open', 'signup'];

export function claimairgrab(airgrab) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_CLAIMAIRGRAB_PENDING
    });

    const { account, authorization } = settings;

    const methodAttributes = {};

    if (!whiteListedMethods.includes(airgrab.method)) {
      return;
    }

    Object.keys(airgrab.methodAttributes).forEach((attribute) => {
      if (blackListedMethodAttributes.includes(attribute)) {
        return;
      }
      methodAttributes[attribute] = airgrab.methodAttributes[attribute].replace('{account}', settings.account);
    });

    return eos(connection, true, true).transact({
      actions: [
        {
          account: airgrab.account,
          name: airgrab.method,
          authorization: [{
            actor: account,
            permission: authorization
          }],
          data: methodAttributes
        }
      ]
    }, {
      broadcast: connection.broadcast,
      expireSeconds: connection.expireSeconds,
      sign: connection.sign
    }).then((tx) => {
      if (!connection.broadcast) {
        // If this is not broadcast, it's likely a watch wallet and the contract needs to be retrieved/stored
        return eos(connection, true).getAbi(airgrab.account).then((contract) => dispatch({
          payload: { contract, tx },
          type: types.SYSTEM_CLAIMAIRGRAB_SUCCESS
        })).catch((err) => dispatch({
          type: types.SYSTEM_GETABI_FAILURE,
          payload: { err },
        }));
      }

      setTimeout(() => {
        dispatch(getTable(airgrab.account, settings.account, 'accounts'));
      }, 500);

      return dispatch({
        payload: { tx },
        type: types.SYSTEM_CLAIMAIRGRAB_SUCCESS
      });
    }).catch((err) => dispatch({
      payload: { err },
      type: types.SYSTEM_CLAIMAIRGRAB_FAILURE
    }));
  };
}

export default {
  claimairgrab
};

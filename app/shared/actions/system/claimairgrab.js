import * as types from '../types';
import eos from '../helpers/eos';
import { getTable } from '../table';

export function claimairgrab(airgrab) {
  return (dispatch: () => void, getState) => {
    const {
      settings,
      connection
    } = getState();

    dispatch({
      type: types.SYSTEM_CLAIMAIRGRAB_PENDING
    });

    const { account } = settings;
    const [, authorization] = connection.authorization.split('@');

    const methodAttributes = {};

    Object.keys(airgrab.methodAttributes).forEach((attribute) => {
      methodAttributes[attribute] = airgrab.methodAttributes[attribute].replace('{account}', settings.account);
    });

    return eos(connection, true).transaction({
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
      expireInSeconds: connection.expireInSeconds,
      sign: connection.sign
    }).then((tx) => {
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

import * as types from './types';
import EOSContract from '../utils/EOS/Contract';
import eos from './helpers/eos';

export function getAbi(account) {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.SYSTEM_GETABI_REQUEST
    });
    const { connection } = getState();
    return eos(connection, true).getAbi(account).then((contract) => {
      if (!contract.abi) {
        return dispatch({
          type: types.SYSTEM_GETABI_FAILURE
        });
      }
      return dispatch({
        payload: {
          contract
        },
        type: types.SYSTEM_GETABI_SUCCESS
      });
    }).catch((err) => dispatch({
      type: types.SYSTEM_GETABI_FAILURE,
      payload: { err },
    }));
  };
}

export default {
  getAbi
};

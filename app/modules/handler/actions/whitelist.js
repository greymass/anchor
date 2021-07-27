import * as types from '../../../shared/actions/types';

function addWhitelist(blockchain, wallet, entry) {
  return (dispatch: () => void) => dispatch({
    type: types.SYSTEM_WHITELIST_ADD,
    payload: { blockchain, wallet, entry }
  });
}

function removeWhitelist() {
  return (dispatch: () => void) => dispatch({
    type: types.SYSTEM_WHITELIST_REMOVE
  });
}

export {
  addWhitelist,
  removeWhitelist,
};

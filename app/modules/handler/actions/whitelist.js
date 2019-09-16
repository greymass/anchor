import * as types from '../../../shared/actions/types';

export function addWhitelist(blockchain, wallet, entry) {
  return (dispatch: () => void) => dispatch({
    type: types.SYSTEM_WHITELIST_ADD,
    payload: { blockchain, wallet, entry }
  });
}

export function removeWhitelist() {
  return (dispatch: () => void) => dispatch({
    type: types.SYSTEM_WHITELIST_REMOVE
  });
}

export default {
  addWhitelist,
  removeWhitelist,
};

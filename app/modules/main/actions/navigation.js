import { push } from 'react-router-redux';

import * as types from '../../../shared/actions/types';

export function changeModule(module) {
  return (dispatch: () => void) => {
    dispatch(push(`/${module}`));
    return dispatch({
      type: types.NAVIGATION_CHANGE_MODULE,
      payload: { module }
    });
  };
}

export default {
  changeModule
};

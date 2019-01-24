import * as types from '../../../shared/actions/types';
import { push } from 'react-router-redux'

// Dispatch from anywhere like normal.

export function changeModule(module) {
  return (dispatch: () => void) => {
    dispatch(push(`/${module}`))
    return dispatch({
      type: types.NAVIGATION_CHANGE_MODULE,
      payload: { module }
    });
  };
}

export default {
  changeModule
};

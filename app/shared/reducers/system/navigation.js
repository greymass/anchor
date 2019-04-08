import * as types from '../../actions/types';

const initialState = {
  module: 'home'
};

export default function navigation(state = initialState, action) {
  switch (action.type) {
    case types.NAVIGATION_CHANGE_MODULE: {
      return Object.assign({}, state, {
        module: action.payload.module,
        loading: true
      });
    }
    case types.NAVIGATION_LOADING_ENDED: {
      return Object.assign({}, state, {
        loading: false
      });
    }
    default: {
      return state;
    }
  }
}

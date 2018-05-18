import * as types from '../actions/types';

export default function settings(state = {}, action) {
  switch (action.type) {
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
}

import * as types from '../actions/types';

const initialState = {
  account: '',
  node: ''
};

export default function settings(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SET_SETTING: {
      return Object.assign({}, state, action.payload);
    }
    default: {
      return state;
    }
  }
}

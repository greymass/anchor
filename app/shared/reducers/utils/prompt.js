import * as types from '../../actions/types';

export default function prompt(state = {}, action) {
  switch (action.type) {
    case types.SYSTEM_EOSIOURI_PENDING: {
      return {};
    }
    case types.SYSTEM_EOSIOURI_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }
    case types.SYSTEM_EOSIOURI_TEMPLATEURI_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }
    case types.SET_CURRENT_WALLET: {
      return Object.assign({}, state, { tx: undefined });
    }
    default: {
      return state;
    }
  }
}

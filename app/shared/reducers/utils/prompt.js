import * as types from '../../actions/types';

export default function prompt(state = {}, action) {
  switch (action.type) {
    case types.SYSTEM_ESRURI_RESET:
    case types.SYSTEM_ESRURI_PENDING: {
      return {};
    }
    case types.SYSTEM_ESRURI_SUCCESS:
    case types.SYSTEM_ESRURIBUILD_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }
    case types.SYSTEM_ESRURIBUILD_PENDING: {
      return Object.assign({}, state, {
        resolved: undefined,
        response: undefined,
      });
    }
    case types.SYSTEM_ESRURISIGN_FAILURE: {
      console.log(action)
      return state;
    }
    case types.SYSTEM_ESRURISIGN_SUCCESS: {
      return Object.assign({}, state, {
        signed: action.payload.signed
      });
    }
    case types.SYSTEM_ESRURIBROADCAST_SUCCESS: {
      return Object.assign({}, state, {
        endpoint: action.payload.endpoint,
        response: action.payload.response,
      });
    }
    case types.SYSTEM_ESRURICALLBACK_FAILURE: {
      return Object.assign({}, state, {
        callbackExecuted: false,
        callbackURL: action.payload.s,
      });
    }
    case types.SYSTEM_ESRURICALLBACK_PENDING: {
      return Object.assign({}, state, {
        callbackExecuted: false,
        callbackURL: false,
      });
    }
    case types.SYSTEM_ESRURICALLBACK_SUCCESS: {
      return Object.assign({}, state, {
        background: action.payload.background,
        callbackExecuted: true,
        callbackURL: action.payload.s,
      });
    }
    // case types.SET_CURRENT_WALLET: {
    //   return Object.assign({}, state, {
    //     response: undefined,
    //     signed: undefined,
    //     tx: undefined
    //   });
    // }
    default: {
      return state;
    }
  }
}

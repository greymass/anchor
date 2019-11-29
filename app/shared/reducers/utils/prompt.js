import * as types from '../../actions/types';

export default function prompt(state = {}, action) {
  switch (action.type) {
    case types.SYSTEM_EOSIOURI_RESET:
    case types.SYSTEM_EOSIOURI_PENDING: {
      return {};
    }
    case types.SYSTEM_EOSIOURI_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }
    case types.SYSTEM_EOSIOURIBUILD_PENDING: {
      return Object.assign({}, state, {
        response: undefined,
        signed: undefined,
        tx: undefined
      });
    }
    case types.SYSTEM_EOSIOURIBUILD_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }
    case types.SYSTEM_EOSIOURISIGN_FAILURE: {
      console.log(action)
      return state;
    }
    case types.SYSTEM_EOSIOURISIGN_SUCCESS: {
      return Object.assign({}, state, {
        signed: action.payload.signed
      });
    }
    case types.SYSTEM_EOSIOURIBROADCAST_SUCCESS: {
      return Object.assign({}, state, {
        endpoint: action.payload.endpoint,
        response: action.payload.response,
      });
    }
    case types.SYSTEM_EOSIOURICALLBACK_FAILURE: {
      return Object.assign({}, state, {
        callbackExecuted: false,
        callbackURL: action.payload.s,
      });
    }
    case types.SYSTEM_EOSIOURICALLBACK_PENDING: {
      return Object.assign({}, state, {
        callbackExecuted: false,
        callbackURL: false,
      });
    }
    case types.SYSTEM_EOSIOURICALLBACK_SUCCESS: {
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

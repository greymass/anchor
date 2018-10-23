import * as types from '../actions/types';

export default function balances(state = {}, action) {
  switch (action.type) {
    case types.APP_UPDATE_DOWNLOAD_PROGRESS: {
      return Object.assign({}, state, {
        download: action.payload
      });
    }
    case types.SYSTEM_GETCONSTANTS_SUCCESS: {
      return Object.assign({}, state, {
        constants: action.payload.data
      });
    }
    default: {
      return state;
    }
  }
}

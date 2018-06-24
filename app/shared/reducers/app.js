import * as types from '../actions/types';

export default function balances(state = {}, action) {
  switch (action.type) {
    case types.APP_UPDATE_DOWNLOAD_PROGRESS: {
      return Object.assign({}, state, {
        download: action.payload
      });
    }
    default: {
      return state;
    }
  }
}

import * as types from '../../actions/types';

const initialState = {};

export default function actions(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.CLEAR_ACTIONS_CACHE: {
      let newState = state;

      state.keys.forEach((account) => {
        newState = Object.assign({}, newState, {
          [account]: Object.assign({}, newState[account], {
            list: []
          })
        });
      });

      return newState;
    }
    case types.GET_ACTIONS_FAILURE: {
      return Object.assign({}, state, {
        [action.payload.account_name]: Object.assign({}, state, {
          last_error: action.payload.error,
          list: []
        })
      });
    }
    case types.GET_ACTIONS_SUCCESS: {
      return Object.assign({}, state, {
        [action.payload.account_name]: Object.assign({}, state, {
          updated: Date.now(),
          list: action.payload.list,
          newest_request_id: action.payload.list[0] && action.payload.list[0].request_id,
          oldest_request_id: action.payload.list[-1] && action.payload.list[-1].request_id
        })
      });
    }
    case types.GET_ACTIONS_REQUEST:
    default: {
      return state;
    }
  }
}

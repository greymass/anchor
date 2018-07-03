import * as types from '../actions/types';

const initialStatePerAccount = {
  updated: null,
  last_error: null,
  list: [],
  newest_request_id: null,
  oldest_request_id: null
};

export default function actions(state = {}, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      const newState = state;

      Object.keys(state).forEach((account) => {
        newState[account] = Object.assign({}, newState[account], initialStatePerAccount);
      });

      return newState;
    }

    case types.CLEAR_ACTIONS_CACHE: {
      const newState = state;

      Object.keys(state).forEach((account) => {
        newState[account] = Object.assign({}, newState[account], {
          list: []
        });
      });

      return newState;
    }
    case types.GET_ACTIONS_FAILURE: {
      const accountName = action.payload.account_name;

      return Object.assign({}, state, {
        [accountName]: Object.assign({}, state[accountName], {
          last_error: action.payload.error,
          list: []
        })
      });
    }
    case types.GET_ACTIONS_SUCCESS: {
      const accountName = action.payload.account_name;

      if (action.payload.no_change) {
        return Object.assign({}, state, {
          [accountName]: Object.assign({}, state[accountName], {
            updated: Date.now(),
          })
        });
      }

      const actionList = action.payload.list;
      const oldestAction = actionList[actionList.length - 1];

      return Object.assign({}, state, {
        [accountName]: Object.assign({}, {}, {
          updated: Date.now(),
          list: actionList,
          newest_request_id: actionList[0] && actionList[0].account_action_seq,
          oldest_request_id: oldestAction && oldestAction.account_action_seq
        })
      });
    }
    case types.GET_ACTIONS_REQUEST:
    default: {
      return state;
    }
  }
}

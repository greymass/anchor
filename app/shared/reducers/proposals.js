import * as types from '../actions/types';

const initialState = {
  list: [],
  votes: [],
  scope: ''
};

export default function proposals(state = initialState, action) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_GOVERNANCE_GET_PROPOSALVOTES_SUCCESS: {
      return Object.assign({}, state, {
        votes: action.payload.votes,
        scope: action.payload.scope
      });
    }
    case types.SYSTEM_GOVERNANCE_GET_PROPOSALS_SUCCESS: {
      return Object.assign({}, state, {
        list: action.payload.proposals,
        scope: action.payload.scope
      });
    }
    default: {
      return state;
    }
  }
}

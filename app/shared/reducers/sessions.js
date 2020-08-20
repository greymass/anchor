import * as types from '../actions/types';

const initialState = {
  linkId: null,
  linkUrl: 'cb.anchor.link',
  requestKey: null,
  sessions: [],
};

export default function sessions(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_SESSIONS_SYNC: {
      return Object.assign({}, state, {
        linkId: action.payload.linkId,
        linkUrl: action.payload.linkUrl,
        sessions: action.payload.sessions,
        requestKey: action.payload.requestKey,
      });
    }
    default: {
      return state;
    }
  }
}

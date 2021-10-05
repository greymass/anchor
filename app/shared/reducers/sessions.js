import * as types from '../actions/types';

import log from 'electron-log';

const initialState = {
  lastClose: false,
  lastCreate: false,
  lastEvent: false,
  lastEventData: false,
  lastOpen: false,
  lastPing: false,
  lastMessage: false,
  linkId: null,
  linkUrl: 'cb.anchor.link',
  requestKey: null,
  sessions: [],
};

const slog = log.create('sessions');
slog.transports.file.format = '[{h}:{i}:{s}] {text}';
slog.transports.file.fileName = 'session';

export default function sessions(state = initialState, action = {}) {
  switch (action.type) {
    case types.RESET_ALL_STATES: {
      return Object.assign({}, initialState);
    }
    case types.SYSTEM_SESSIONS_EVENT: {
      slog.info(action.payload);
      const newState = Object.assign({}, state, {
        lastEvent: new Date().toISOString(),
        lastEventType: action.payload.type,
        lastEventData: JSON.stringify(action.payload.event),
      });
      switch (action.payload.type) {
        case 'onclose': {
          newState.lastClose = new Date().toISOString();
          break;
        }
        case 'oncreate': {
          newState.lastCreate = new Date().toISOString();
          break;
        }
        case 'onopen': {
          newState.lastOpen = new Date().toISOString();
          break;
        }
        case 'onping': {
          newState.lastPing = new Date().toISOString();
          break;
        }
        case 'onmessage': {
          newState.lastMessage = new Date().toISOString();
          break;
        }
      }
      return newState;
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

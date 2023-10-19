import {
  AnchorLinkSessionManager,
  AnchorLinkSessionManagerSession,
  AnchorLinkSessionManagerStorage,
} from '@greymass/anchor-link-session-manager';
import WebSocket from 'ws';

import * as types from '../actions/types';

export default class SessionManager {
  handler: null;
  storage: null;

  constructor(sessions, settings) {
    console.log('SessionManager::constructor');
    if (settings.walletMode !== 'cold') {
      this.createHandler();
      this.createStorage(sessions);
      this.manager = new AnchorLinkSessionManager({
        handler: this.handler,
        storage: this.storage,
        WebSocket,
      });
    }
  }
  addSession(data) {
    console.log('SessionManager::addSession');
    const session = AnchorLinkSessionManagerSession.fromIdentityRequest(
      data.network,
      data.actor,
      data.permission,
      data.payload
    );
    this.manager.addSession(session);
  }
  removeSession(data) {
    console.log('SessionManager::removeSession');
    const session = new AnchorLinkSessionManagerSession(
      data.network,
      data.actor,
      data.permission,
      data.publicKey,
      data.name
    );
    this.manager.removeSession(session);
  }
  createHandler() {
    console.log('SessionManager::createHandler');
    this.handler = {
      onStorageUpdate(json) {
        const storage = JSON.parse(json);
        global.storeDispatch({
          type: types.SYSTEM_SESSIONS_SYNC,
          payload: storage,
        });
      },
      onIncomingRequest(payload) {
        global.handleUri(payload);
      },
    };
  }
  createStorage(sessions) {
    if (sessions && sessions.requestKey && sessions.linkId) {
      const json = JSON.stringify(sessions);
      this.storage = AnchorLinkSessionManagerStorage.unserialize(json);
    }
  }
}

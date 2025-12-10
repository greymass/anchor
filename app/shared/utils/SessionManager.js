import {
  AnchorLinkSessionManager,
  AnchorLinkSessionManagerSession,
  AnchorLinkSessionManagerStorage,
} from '@greymass/anchor-link-session-manager';
import WebSocket from 'ws';

import * as types from '../actions/types';

export default class SessionManager {
  handler: null;
  pHandler: null;
  store: null;
  storage: null;

  constructor(store, pHandler) {
    console.log('SessionManager::constructor');
    this.pHandler = pHandler;
    this.store = store;
    const { settings } = this.store.getState();
    if (settings.walletMode !== 'cold') {
      this.createHandler();
      this.createStorage();
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
  destroy() {
    if (this.manager && this.manager.disconnect) {
      this.manager.disconnect();
    }
    this.pHandler = null;
    this.store = null;
  }
  createHandler() {
    console.log('SessionManager::createHandler');
    const self = this;
    this.pHandler.webContents.send('sessionEvent', 'oncreate');
    this.handler = {
      onStorageUpdate(json) {
        const storage = JSON.parse(json);
        if (self.store) {
          self.store.dispatch({
            type: types.SYSTEM_SESSIONS_SYNC,
            payload: storage,
          });
        }
      },
      onIncomingRequest(payload) {
        if (self.pHandler) {
          self.pHandler.webContents.send('openUri', payload);
          self.pHandler.setVisibleOnAllWorkspaces(true);
          self.pHandler.show();
          self.pHandler.focus();
          self.pHandler.setVisibleOnAllWorkspaces(false);
        }
      },
      onSocketEvent(type, event) {
        if (self.pHandler && self.pHandler.webContents) {
          self.pHandler.webContents.send('sessionEvent', type, JSON.stringify(event));
        }
      },
    };
  }
  createStorage() {
    const { sessions } = this.store.getState();
    if (sessions && sessions.requestKey && sessions.linkId) {
      const json = JSON.stringify(sessions);
      this.storage = AnchorLinkSessionManagerStorage.unserialize(json);
    }
  }
}

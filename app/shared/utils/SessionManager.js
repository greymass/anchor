import {
  AnchorLinkSessionManager,
  AnchorLinkSessionManagerSession,
  AnchorLinkSessionManagerStorage
} from '@greymass/anchor-link-session-manager';

import * as types from '../actions/types';

export default class SessionManager {
  handler: null;
  pHandler: null;
  store: null;
  storage: null;

  constructor(store, pHandler) {
    this.pHandler = pHandler;
    this.store = store;
    this.createHandler();
    this.createStorage();
    this.manager = new AnchorLinkSessionManager({
      handler: this.handler,
      storage: this.storage,
    });
    this.manager.connect();
  }
  addSession(data) {
    const session = AnchorLinkSessionManagerSession.fromIdentityRequest(
      data.network,
      data.actor,
      data.permission,
      data.payload,
    );
    this.manager.addSession(session);
  }
  removeSession(data) {
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
    const {
      pHandler,
      store,
    } = this;
    this.handler = {
      onStorageUpdate(json) {
        const storage = JSON.parse(json);
        store.dispatch({
          type: types.SYSTEM_SESSIONS_SYNC,
          payload: storage
        });
      },
      onIncomingRequest(payload) {
        pHandler.webContents.send('openUri', payload);
        pHandler.setVisibleOnAllWorkspaces(true);
        pHandler.show();
        pHandler.focus();
        pHandler.setVisibleOnAllWorkspaces(false);
      }
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

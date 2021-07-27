const { ipcRenderer } = require('electron');

export function removeSession(session) {
  return async (dispatch: () => void) => {
    ipcRenderer.send('removeSession', session);
  };
}

export function clearSessions() {
  return async (dispatch: () => void) => {
    ipcRenderer.send('clearSessions');
  };
}

export default {
  clearSessions,
  removeSession,
};

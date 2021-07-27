const { ipcRenderer } = require('electron');

function removeSession(session) {
  return async (dispatch: () => void) => {
    ipcRenderer.send('removeSession', session);
  };
}

function clearSessions() {
  return async (dispatch: () => void) => {
    ipcRenderer.send('clearSessions');
  };
}

export {
  clearSessions,
  removeSession,
};

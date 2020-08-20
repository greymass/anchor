const { ipcRenderer } = require('electron');

export function removeSession(session) {
  return async (dispatch: () => void) => {
    ipcRenderer.send('removeSession', session);
  };
}

export default {
  removeSession
};

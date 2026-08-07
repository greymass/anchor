function getRemote() {
  if (process.type === 'browser') {
    return false;
  }
  return require('@electron/remote');
}

function getGlobal(name) {
  if (process.type === 'browser') {
    return global[name];
  }
  return getRemote().getGlobal(name);
}

function getCurrentWindow() {
  return getRemote().getCurrentWindow();
}

module.exports = {
  getCurrentWindow,
  getGlobal,
};

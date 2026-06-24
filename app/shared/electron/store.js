const electron = require('electron');

if (!electron.app && !electron.remote) {
  Object.defineProperty(electron, 'remote', {
    configurable: true,
    value: require('@electron/remote')
  });
}

module.exports = require('electron-store');

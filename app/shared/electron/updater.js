import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

const log = require('electron-log');

let updater;
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.autoDownload = false;
autoUpdater.allowPrerelease = false;

autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString());
});

autoUpdater.on('update-available', () => {
  autoUpdater.downloadUpdate();
});

autoUpdater.on('update-not-available', () => {
  dialog.showMessageBox({
    title: 'No Updates',
    message: 'Current version is up-to-date.'
  });
  updater.enabled = true;
  updater = null;
});

autoUpdater.on('update-downloaded', () => {
  dialog.showMessageBox({
    title: 'Install Updates',
    message: 'Updates downloaded, application will be quit for update...'
  }).then(() => setImmediate(() => autoUpdater.quitAndInstall()));
});

autoUpdater.on('download-progress', (progress) => {
  updater.window.webContents.send('downloadProgress', progress);
});

function checkForUpdates(menuItem, focusedWindow) {
  updater = menuItem;
  updater.enabled = false;
  updater.window = focusedWindow;
  autoUpdater.checkForUpdates();
}

module.exports.checkForUpdates = checkForUpdates;

import { dialog } from 'electron';
import { autoUpdater } from 'electron-updater';

let updater;
autoUpdater.autoDownload = false;

autoUpdater.on('error', (error) => {
  dialog.showErrorBox('Error: ', error == null ? 'unknown' : (error.stack || error).toString());
});

autoUpdater.on('update-available', () => {
  dialog.showMessageBox({
    type: 'warning',
    title: 'Update Found',
    checkboxLabel: 'I understand the risks and want to update automatically.',
    message: 'The most secure way to update is to download the latest release from GitHub, verify, and install. This update process will attempt to do that automatically.',
    detail: 'Be careful not to perform any kind of update on a malware-infected computer, public wi-fi, or an insecure network. Doing so may increase the possible risk of a man-in-the-middle attack.',
    buttons: ['Upgrade', 'Cancel']
  }, (buttonIndex, checkboxChecked) => {
    if (buttonIndex === 0) {
      if (checkboxChecked) {
        autoUpdater.downloadUpdate();
      } else {
        dialog.showMessageBox({
          type: 'info',
          title: 'Aborted',
          message: 'The automatic upgrade was cancelled.',
          detail: 'If you would like to update, please try again and check the checkbox stating you understand the risks involved.',
          buttons: ['Close']
        }, () => {
          updater.enabled = true;
          updater = null;
        });
      }
    } else {
      updater.enabled = true;
      updater = null;
    }
  });
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
  }, () => {
    setImmediate(() => autoUpdater.quitAndInstall());
  });
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

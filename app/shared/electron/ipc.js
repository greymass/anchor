import { app, ipcMain } from 'electron';
import { checkForUpdates } from './updater';
import {
  decryptKeyCertificate,
  generateNewAccount,
  getKeyCertificateCode,
  printKeyCertificate,
  resetKeyCertificateCache,
  saveKeyCertificate,
  updateKeyWithCertificate,
} from './ipc/keycert';

const { dialog } = require('electron');
const fs = require('fs');

const pad = (v) => ((v < 10) ? `0${v}` : v);

const getDateString = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const min = pad(date.getMinutes());
  const sec = pad(date.getSeconds());
  return `${year}${month}${day}-${hour}${min}${sec}`;
};

let saveFileLock = false;

const configureIPC = (ui, store, primary = false) => {
  if (primary) {

    ipcMain.on('generateNewAccount', (
      event,
      password,
      chainId,
      accountName,
      ownerKey,
      activeKey,
    ) => generateNewAccount(event, store, password, chainId, accountName, ownerKey, activeKey));

    ipcMain.on('saveKeyCertificate', (
      event,
      password,
      publicKey,
      chainId,
      accountName,
    ) => saveKeyCertificate(event, store, password, publicKey, chainId, accountName));

    ipcMain.on('printKeyCertificate', (
      event,
      password,
      publicKey,
      chainId,
      accountName,
    ) => printKeyCertificate(event, store, password, publicKey, chainId, accountName));

    ipcMain.on('resetKeyCertificateCache', () => resetKeyCertificateCache())

    ipcMain.on('decryptKeyCertificate', (
      event,
      certificate,
      encryptionWords,
    ) => decryptKeyCertificate(event, store, certificate, encryptionWords))

    ipcMain.on('updateKeyWithCertificate', (
      event,
      password,
      certificate,
      encryptionWords,
      reset = false,
    ) => updateKeyWithCertificate(event, store, password, certificate, encryptionWords, reset))

    ipcMain.on('getKeyCertificateCode', (
      event,
      chainId,
      accountName,
      mnemonicWords,
    ) => getKeyCertificateCode(event, chainId, accountName, mnemonicWords))

    ipcMain.on('openFile', (event, openPath = false) => {
      const defaultPath = (openPath || app.getPath('documents'));
      dialog.showOpenDialog({
        defaultPath,
        filters: [
          { name: 'JSON', extensions: ['json'] },
        ],
        properties: ['openFile']
      }).then(({ canceled, filePaths }) => {
        if (canceled || filePaths === undefined) {
          event.sender.send('openFileCancel');
          return false;
        }
        const [fileName] = filePaths;
        fs.readFile(fileName, 'utf-8', (err, data) => {
          if (err) {
            console.log(`An error ocurred reading the file: ${err.message}`);
            event.sender.send('openFileError', err);
            return;
          }
          event.sender.send('lastFileSuccess', fileName);
          event.sender.send('openFileData', data);
        });
      });
    });

    ipcMain.on('saveFile', async (event, savePath = false, data, prefix = 'tx', appendDate = true, ext = 'json') => {
      // Check to ensure no other saveFile dialogs are awaiting
      if (saveFileLock) return false;
      // Set the lock
      saveFileLock = true;
      const defaultPath = (savePath || app.getPath('documents'));
      let defaultFilename = prefix;
      if (appendDate) {
        defaultFilename += `-${getDateString()}`;
      }
      defaultFilename += `.${ext}`;
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: 'Save File',
        defaultPath: `${defaultPath}/${defaultFilename}`,
        filters: [
          { name: ext, extensions: [ext] }
        ]
      });
      // Unset the lock
      saveFileLock = false;
      if (canceled || !filePath) return;

      fs.writeFileSync(filePath, data);
      event.sender.send('lastFileSuccess', filePath);
    });

    ipcMain.on('checkForUpdates', () => {
      checkForUpdates({}, ui);
    });

    const defaultSize = {
      width: 940,
      height: 580,
      zoom: 1,
    };

    ipcMain.on('anchor-resize', (event, size = defaultSize) => {
      ui.setSize(size.width, size.height);
      ui.webContents.setZoomFactor(size.zoom);
    });
  }
};

module.exports = { configureIPC };

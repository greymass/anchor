import { app, ipcMain } from 'electron';
import { checkForUpdates } from '../shared/updater';

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

const configureIPC = (ui) => {
  ipcMain.on('openFile', (event, openPath = false) => {
    const defaultPath = (openPath || app.getPath('documents'));
    dialog.showOpenDialog(ui, { defaultPath }, (fileNames) => {
      if (fileNames === undefined) {
        event.sender.send('openFileCancel');
        return;
      }
      const [fileName] = fileNames;
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

  ipcMain.on('saveFile', (event, savePath = false, data, prefix = 'tx') => {
    const defaultPath = (savePath || app.getPath('documents'));
    const defaultFilename = `${prefix}-${getDateString()}.json`;
    const fileName = dialog.showSaveDialog({
      title: 'Save File',
      defaultPath: `${defaultPath}/${defaultFilename}`,
      filters: [
        { name: 'JSON Files', extensions: ['json'] }
      ]
    });

    if (!fileName) return;

    fs.writeFileSync(fileName, data);
    event.sender.send('lastFileSuccess', fileName);
  });

  ipcMain.on('checkForUpdates', () => {
    checkForUpdates({}, ui);
  });
}

module.exports = { configureIPC };

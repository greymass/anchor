import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from '../menu';
import packageJson from '../../package.json';

import { windowStateKeeper } from '../shared/windowStateKeeper';

const { dialog } = require('electron');
const fs = require('fs');
const log = require('electron-log');
const path = require('path');

require('electron-context-menu')();

const createInterface = (resourcePath, route = '/', closable = true, store) => {
  log.info('ui: creating');

  const uiStateKeeper = windowStateKeeper(store);
  const { name, version } = packageJson;
  const title = `${name} - ${version}`;

  const ui = new BrowserWindow({
    closable,
    x: uiStateKeeper.x,
    y: uiStateKeeper.y,
    width: uiStateKeeper.width,
    height: uiStateKeeper.height,
    title,
    show: true,
    resizable: true,
    backgroundColor: '#f1f0ee',
    icon: path.join(resourcePath, 'renderer/assets/icons/png/64x64.png')
  });

  uiStateKeeper.track(ui);

  ui.loadURL(`file://${path.join(resourcePath, 'renderer/basic/index.html')}#${route}`);

  ui.on('page-title-updated', (e) => {
    e.preventDefault();
  });

  ui.webContents.on('did-finish-load', () => {
    log.info('manager: loaded');
    ui.show();
    ui.focus();
    ui.setTitle(title);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      ui.openDevTools({ mode: 'detach' });
    }
  });

  const menuBuilder = new MenuBuilder(ui);
  menuBuilder.buildMenu();

  return ui;
};

ipcMain.on('openFile', (event) => {
  dialog.showOpenDialog((fileNames) => {
    if (fileNames === undefined) {
      event.sender.send('fileOpenCancel');
      return;
    }
    const fileName = fileNames[0];
    fs.readFile(fileName, 'utf-8', () => {
      readFile(fileNames[0]);
    });
  });

  function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', (err, data) => {
      if (err) {
        console.log(`An error ocurred reading the file: ${err.message}`);
        return;
      }
      event.sender.send('fileOpenData', data);
    });
  }
});

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

ipcMain.on('saveFile', (event, data, prefix = 'tx') => {
  const defaultPath = app.getPath('documents');
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
});

export default { createInterface };

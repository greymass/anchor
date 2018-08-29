import { app, BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from '../menu';
import packageJson from '../../package.json';

import { saveFile } from '../shared/saveFile';
import { windowStateKeeper } from '../shared/windowStateKeeper';

console.log(saveFile)

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

  ui.loadURL(`file://${path.join(resourcePath, 'renderer/wallet/index.html')}#${route}`);

  ui.on('page-title-updated', (e) => e.preventDefault());

  ui.webContents.on('did-finish-load', () => {
    log.info('wallet: loaded');
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

ipcMain.on('saveFile', saveFile);

export default { createInterface };

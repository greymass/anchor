import { BrowserWindow, ipcMain } from 'electron';

const path = require('path');
const log = require('electron-log');

const createInterface = (resourcePath, route = '/', closable = true) => {
  log.info('ui: creating');

  const ui = new BrowserWindow({
    closable,
    width: 960,
    height: 540,
    show: false,
    frame: true,
    fullscreenable: false,
    resizable: true,
    transparent: false,
    alwaysOnTop: false
  });

  ui.loadURL(`file://${path.join(resourcePath, 'renderer/basic/index.html')}#${route}`);

  ui.webContents.on('did-finish-load', () => {
    log.info('manager: loaded');
    ui.show();
    ui.focus();
    ui.openDevTools({ mode: 'detach' });
  });

  return ui;
};

// Make method externaly visible
ipcMain.on('ping', (event, arg1, arg2, arg3) => {
  console.log('Ping', arg1, arg2, arg3); // eslint-disable-line no-console
  event.sender.send('pong', arg1, arg2, arg3);
});

export default { createInterface };

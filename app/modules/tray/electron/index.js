import { BrowserWindow } from 'electron';

const path = require('path');
const log = require('electron-log');

const createTray = (resourcePath) => {
  log.info('tray menu: creating');

  const menu = new BrowserWindow({
    width: 300,
    height: 450,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    transparent: true,
    alwaysOnTop: true,
    webPreferences: {
      backgroundThrottling: false
    }
  });

  menu.loadURL(`file://${path.join(resourcePath, 'renderer/tray/index.html')}#/`);

  menu.webContents.on('did-finish-load', () => {
    log.info('tray menu: loaded');
  });

  menu.on('blur', () => {
    if (!menu.webContents.isDevToolsOpened()) {
      menu.hide();
    }
  });

  return menu;
};

export default { createTray };

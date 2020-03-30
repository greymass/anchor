import { BrowserWindow } from 'electron';
import packageJson from '../../../package.json';

import { configureIPC } from '../../../shared/electron/ipc';
import { clearURI } from '../actions/uri';
import { windowStateKeeper } from '../../../shared/electron/windowStateKeeper';

const { exec } = require('child_process');
const log = require('electron-log');
const path = require('path');

require('electron-context-menu')();

let ui;

const createProtocolHandlers = (resourcePath, store, request = false) => {
  log.info('protocol handler: creating ui');
  log.info('initial request', request);

  const uiStateKeeper = windowStateKeeper(store, 'signingWindow');

  const { productName, version } = packageJson;
  const title = `Signing Request - ${productName} (${version})`;

  ui = new BrowserWindow({
    alwaysOnTop: true,
    frame: false,
    x: uiStateKeeper.x,
    y: uiStateKeeper.y,
    width: uiStateKeeper.width,
    height: uiStateKeeper.height,
    title,
    skipTaskbar: true,
    show: false,
    resizable: true,
    backgroundColor: '#f1f0ee',
    icon: path.join(resourcePath, 'renderer/assets/icons/png/64x64.png')
  });

  uiStateKeeper.track(ui);

  ui.loadURL(`file://${path.join(resourcePath, 'renderer/handler/index.html')}`);

  ui.webContents.on('did-finish-load', () => {
    log.info('protocol handler: loaded ui');
    ui.focus();
    ui.setTitle(title);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      ui.openDevTools({ mode: 'detach' });
    }
  });

  // macOS: Tell Chrome it should enable the "Always open" checkbox for the first ESR link
  if (process.platform === 'darwin') {
    exec('defaults write com.google.Chrome ExternalProtocolDialogShowAlwaysOpenCheckbox -bool true');
  }

  // TODO: Needs proper hide/close logic independent of the primary ui
  ui.on('close', (e) => {
    if (ui.isVisible()) {
      store.dispatch(clearURI());
      setTimeout(() => {
        ui.hide();
      }, 100);
      e.preventDefault();
      return false;
    }
  });

  configureIPC(ui);

  return ui;
};

export default { createProtocolHandlers };

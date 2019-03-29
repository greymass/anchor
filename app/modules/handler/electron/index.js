import { BrowserWindow } from 'electron';
import packageJson from '../../../package.json';

import { configureIPC } from '../../../shared/electron/ipc';
import { clearURI } from '../actions/uri';

const log = require('electron-log');
const path = require('path');

require('electron-context-menu')();

let ui;

const createProtocolHandlers = (resourcePath, store, request = false) => {
  log.info('protocol handler: creating ui');
  log.info('initial request', request);

  const { name, version } = packageJson;
  const title = `Signing Request - ${name} (${version})`;

  ui = new BrowserWindow({
    alwaysOnTop: true,
    center: true,
    width: 800,
    height: 600,
    title,
    skipTaskbar: true,
    show: false,
    resizable: true,
    backgroundColor: '#f1f0ee',
    icon: path.join(resourcePath, 'renderer/assets/icons/png/64x64.png')
  });

  ui.loadURL(`file://${path.join(resourcePath, 'renderer/handler/index.html')}`);

  ui.webContents.on('did-finish-load', () => {
    log.info('protocol handler: loaded ui');
    ui.focus();
    ui.setTitle(title);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      ui.openDevTools({ mode: 'detach' });
    }
  });

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

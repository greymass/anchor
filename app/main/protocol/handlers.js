import { BrowserWindow, protocol } from 'electron';
import packageJson from '../../package.json';

import { configureIPC } from '../shared/ipc';
import { windowStateKeeper } from '../shared/windowStateKeeper';

const log = require('electron-log');
const path = require('path');

require('electron-context-menu')();

let ui;

const createProtocolHandlers = (resourcePath, store, request = false) => {
  log.info('protocol handler: creating ui');
  log.info('initial request', request)

  const uiStateKeeper = windowStateKeeper(store);
  const { name, version } = packageJson;
  const title = `${name} - ${version}`;

  ui = new BrowserWindow({
    alwaysOnTop: true,
    x: uiStateKeeper.x,
    y: uiStateKeeper.y,
    width: uiStateKeeper.width,
    height: uiStateKeeper.height,
    title,
    skipTaskbar: true,
    show: true,
    resizable: true,
    backgroundColor: '#f1f0ee',
    icon: path.join(resourcePath, 'renderer/assets/icons/png/64x64.png')
  });

  uiStateKeeper.track(ui);

  ui.loadURL(`file://${path.join(resourcePath, 'renderer/handler/index.html')}`);

  ui.webContents.on('did-finish-load', () => {
    log.info('protocol handler: loaded ui');
    // ui.show();
    ui.focus();
    ui.setTitle(title);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      ui.openDevTools({ mode: 'detach' });
    }
  });

  configureIPC(ui);

  protocol.registerHttpProtocol('eosio', (req, cb) => {
    log.info('protocol handler: show ui', cb);
    ui.show();
  });

  return ui;
};

export default { createProtocolHandlers };

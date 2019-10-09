import { BrowserWindow } from 'electron';
import MenuBuilder from '../../../shared/electron/menu';
import packageJson from '../../../package.json';

import { configureIPC } from '../../../shared/electron/ipc';
import { windowStateKeeper } from '../../../shared/electron/windowStateKeeper';
import handleUri from '../../../shared/utils/UriHandler';

const log = require('electron-log');
const path = require('path');

require('electron-context-menu')();

let ui;

const createInterface = (resourcePath, route = '/', closable = true, store, uri = false, pHandler = false) => {
  log.info('wallet ui: creating');

  const uiStateKeeper = windowStateKeeper(store);
  const { name, version } = packageJson;
  const title = `${name} (${version})`;

  ui = new BrowserWindow({
    closable,
    x: uiStateKeeper.x,
    y: uiStateKeeper.y,
    width: uiStateKeeper.width,
    height: uiStateKeeper.height,
    title,
    show: false,
    resizable: true,
    backgroundColor: '#f1f0ee',
    icon: path.join(resourcePath, 'renderer/assets/icons/png/64x64.png')
  });

  uiStateKeeper.track(ui);

  ui.loadURL(`file://${path.join(resourcePath, 'renderer/main/index.html')}#${route}`);

  ui.on('page-title-updated', (e) => {
    e.preventDefault();
  });

  ui.webContents.on('did-fail-load', () => {
    log.info('manager: failed loading');
    ui.show();
    ui.focus();
    ui.setTitle(title);
  });

  ui.webContents.on('did-finish-load', () => {
    log.info('manager: loaded');
    ui.show();
    ui.focus();
    ui.setTitle(title);
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      ui.openDevTools({ mode: 'detach' });
    }
    // Launch + Load URI, if exists
    if (uri && pHandler) {
      handleUri(resourcePath, store, ui, pHandler, uri);
    }
  });

  const menuBuilder = new MenuBuilder(ui);
  menuBuilder.buildMenu();

  configureIPC(ui, true);

  return ui;
};

export default { createInterface };

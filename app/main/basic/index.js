import { BrowserWindow } from 'electron';
import MenuBuilder from '../../shared/electron/menu';
import packageJson from '../../package.json';

import { configureIPC } from '../../shared/electron/ipc';
import { windowStateKeeper } from '../../shared/electron/windowStateKeeper';

const log = require('electron-log');
const path = require('path');

let ui;

const createInterface = (resourcePath, route = '/', closable = true, store) => {
  log.info('ui: creating');

  const uiStateKeeper = windowStateKeeper(store);
  const { productName, version } = packageJson;
  const title = `${productName} - ${version}`;

  ui = new BrowserWindow({
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

  configureIPC(ui, store);

  return ui;
};

export default { createInterface };

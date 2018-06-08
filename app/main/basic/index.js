import { BrowserWindow, ipcMain } from 'electron';
import MenuBuilder from '../menu';
import packageJson from '../../package.json';

import { windowStateKeeper } from '../shared/windowStateKeeper';

const path = require('path');
const log = require('electron-log');

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

// Make method externaly visible
ipcMain.on('ping', (event, arg1, arg2, arg3) => {
  console.log('Ping', arg1, arg2, arg3); // eslint-disable-line no-console
  event.sender.send('pong', arg1, arg2, arg3);
});

export default { createInterface };

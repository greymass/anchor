import { app, Menu, Tray } from 'electron';

const path = require('path');
const log = require('electron-log');

const createTrayIcon = (resourcePath, menu) => {
  log.info('creating tray menu');

  const trayIcon = path.join(resourcePath, 'renderer/assets/icons/png/32x32.png');
  log.info(trayIcon);

  const tray = new Tray(trayIcon);

  // tray.on('right-click', () => {
  //   toggleMenu(menu, tray);
  // });

  tray.on('click', () => {
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Debug',
        click: () => {
          menu.openDevTools({ mode: 'detach' });
          log.info('Anchor > Tray Menu > DevTools');
        }
      },
      {
        label: 'Quit',
        click: () => {
          app.quit();
        }
      }
    ]);
    tray.popUpContextMenu(contextMenu);
  });

  return tray;
};

const toggleMenu = (menu, tray) => {
  if (menu.isVisible()) {
    menu.hide();
  } else {
    showMenu(menu, tray);
  }
};

const showMenu = (menu, tray) => {
  const position = getWindowPosition(menu, tray);
  menu.setPosition(position.x, position.y, false);
  menu.show();
  menu.focus();
};

const getWindowPosition = (menu, tray) => {
  const windowBounds = menu.getBounds();
  const trayBounds = tray.getBounds();
  const width = (trayBounds.width / 2) - (windowBounds.width / 2);
  const x = Math.round(trayBounds.x + width);
  const y = Math.round(trayBounds.y + trayBounds.height + 4);
  return { x, y };
};

export default { createTrayIcon };

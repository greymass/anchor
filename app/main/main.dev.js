/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import { app, crashReporter } from 'electron';
import { configureStore } from '../shared/store/main/configureStore';
import { configureLocalization } from './shared/i18n';

import { createInterface } from './basic';
import { windowStateKeeper } from './shared/windowStateKeeper'

const path = require('path');
const log = require('electron-log');

const { store } = configureStore();

let resourcePath = __dirname;
let ui = null;

if (process.mainModule.filename.indexOf('app.asar') === -1) {
  log.info('running in debug without asar, modifying path');
  resourcePath = path.join(resourcePath, '../');
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};

// bind all console.log to electron-log
const cl = console.log.bind(console);
console.log = (...args) => {
  log.info(args);
  cl(...args);
};

log.info('app: initializing');

configureStore();
configureLocalization(resourcePath);

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();

  const p = path.join(resourcePath, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);

  // Log all messages
  log.transports.file.level = 'info';
}

// crash reporter for failures (NYI)
crashReporter.start({
  productName: 'eos-voter',
  companyName: '',
  submitURL: '',
  uploadToServer: false
});

// main exceptions to electron-log
app.on('uncaughtException', (error) => {
  log.error(error);
});

// main start
app.on('ready', async () => {
  log.info('app: ready');
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    log.info('development mode enabled');
    await installExtensions();
  }
  // If this is the first run, walk through the welcome
  if (!store.getState().settings.configured) {
    log.info('new installation detected');
    ui = initManager('/', true);
  } else {

    initMenu();
  }

  createMainWindow();
});

// debug event logging
app.on('window-all-closed', () => {
  log.info('app: window-all-closed');
  app.quit()
});
app.on('will-finish-launching', () => { log.info('app: will-finish-launching'); });
app.on('before-quit', () => { log.info('app: before-quit'); });
app.on('will-quit', () => { log.info('app: will-quit'); });
app.on('quit', () => { log.info('app: quit'); });

const initManager = (route = '/', closable = true) => {
  ui = createInterface(resourcePath, route, closable);
  ui.on('close', () => {
    ui = null;
  });
};

const showManager = () => {
  if (!ui) {
    ui = initManager();
  }
};

function createMainWindow() {
  // Get window state
  const mainWindowStateKeeper = windowStateKeeper(store);

  // Creating the window
  const windowOptions = {
    title: 'Main Window',
    x: mainWindowStateKeeper.x,
    y: mainWindowStateKeeper.y,
    width: mainWindowStateKeeper.width,
    height: mainWindowStateKeeper.height,
  };
  
  mainWindow = new BrowserWindow(windowOptions);
  // Track window state
  mainWindowStateKeeper.track(mainWindow);
    // Load content
  return mainWindow;
}

global.showManager = showManager;

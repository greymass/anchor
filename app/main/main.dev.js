/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import { app, crashReporter, protocol } from 'electron';
import { configureStore } from '../shared/store/main/configureStore';
import { createInterface } from './wallet';
import { createTray } from './tray';
import { createTrayIcon } from './tray/icon';
import { createProtocolHandlers } from './protocol/handlers';

const log = require('electron-log');
const path = require('path');

let resourcePath = __dirname;
let ui = null;
let menu = null;
let tray = null;
let pHandler = null;

if (process.mainModule.filename.indexOf('app.asar') === -1) {
  log.info('running in debug without asar, modifying path');
  resourcePath = path.join(resourcePath, '../');
}

const { store } = configureStore({}, resourcePath);

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
protocol.registerStandardSchemes(['eosio']);
app.setAsDefaultProtocolClient('eosio');

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

  protocol.registerHttpProtocol('eosio', (req, cb) => {
    console.log('protocol handler: register', req, cb);
    // TODO: during protocol registration, the uri handler may need to be triggered
  });

  initProtocolHandler();
  // If this is the first run, walk through the welcome
  if (!store.getState().settings.configured) {
    log.info('new installation detected');
    ui = initManager('/', true);
  } else {
    initMenu();
  }
});

// debug event logging
app.on('window-all-closed', () => {
  log.info('app: window-all-closed');
  app.quit();
});
app.on('will-finish-launching', () => {
  app.on('open-url', (req, url) => {
    log.info('app: open-url', url);
    pHandler.webContents.send('openUri', url);
    pHandler.show();
  });
  log.info('app: will-finish-launching');
});
app.on('before-quit', () => {
  log.info('app: before-quit');
  pHandler.close();
});
app.on('will-quit', () => { log.info('app: will-quit'); });
app.on('quit', () => { log.info('app: quit'); });

const initManager = (route = '/', closable = true) => {
  ui = createInterface(resourcePath, route, closable, store);
  ui.on('close', () => {
    ui = null;
  });
};

const initMenu = () => {
  menu = createTray(resourcePath); // Initialize the menu
  tray = createTrayIcon(resourcePath, menu); // Initialize the tray
};

const initProtocolHandler = (request = false) => {
  pHandler = createProtocolHandlers(resourcePath, store, request);
};

const showManager = () => {
  if (!ui) {
    ui = initManager();
  }
};

global.showManager = showManager;

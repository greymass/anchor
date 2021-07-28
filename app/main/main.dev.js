/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import '@babel/polyfill';
import { app, crashReporter, ipcMain, protocol } from 'electron';
import { configureStore } from '../shared/store/main/configureStore';
import { createInterface } from '../modules/main/electron';
import { createTray } from '../modules/tray/electron';
import { createTrayIcon } from '../modules/tray/electron/icon';
import { createProtocolHandlers } from '../modules/handler/electron';
import HardwareLedger from '../shared/utils/Hardware/Ledger';
import handleUri from '../shared/utils/UriHandler';
import SessionManager from '../shared/utils/SessionManager';

import * as types from '../shared/actions/types';
import { getAppConfiguration, ledgerStartListen } from '../shared/actions/hardware/ledger';

const log = require('electron-log');
const path = require('path');
const Transport = require('@ledgerhq/hw-transport-node-hid').default;

const isMac = () => process.platform === 'darwin';

require('electron-context-menu')();

let resourcePath = __dirname;
let mainWindow = null;
let menu = null;
let tray = null;
let sHandler = null;
let pHandler = null;
let uri = null;

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

log.info('anchor: initializing');

// log.info(settings)
// if (settings.allowSigningRequests) {
//   // TODO: remove eosio:// protocol handler in the future, it conflicts with B1 implementation
//   log.info('anchor: registering URL schemes');
//   protocol.registerSchemesAsPrivileged([
//     {
//       scheme: 'eosio',
//       privileges: {
//         standard: true,
//         secure: true,
//         supportFetchAPI: true
//       },
//     },
//     {
//       scheme: 'esr',
//       privileges: {
//         standard: true,
//         secure: true,
//         supportFetchAPI: true
//       },
//     },
//   ]);
// }

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();

  log.info('anchor: starting with development mode settings');

  const p = path.join(resourcePath, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);

  // Log all messages
  log.transports.file.level = 'info';
}

// crash reporter for failures (NYI)
// crashReporter.start({
//   productName: 'anchor',
//   companyName: '',
//   submitURL: '',
//   uploadToServer: false
// });

// main exceptions to electron-log
app.on('uncaughtException', (error) => {
  log.error(error);
});

const lock = process.mas || app.requestSingleInstanceLock();

if (!lock) {
  app.quit();
} else {
  app.on('second-instance', (event, argv) => {
    if (
      (
        process.platform === 'win32'
        || process.platform === 'linux'
      )
      && argv
      && argv.length
    ) {
      uri = argv[argv.length - 1];
    }
    showMain();
    if (pHandler !== null && uri) {
      if (uri.startsWith('esr:')) {
        handleUri(resourcePath, store, mainWindow, pHandler, uri, pHandler);
      }
    } else {
      showManager();
    }
  });
}

// main start
app.on('ready', async () => {
  log.info('anchor: ready');
  const { settings } = store.getState();
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    log.info('development mode enabled');
    // install devtool extensions
    await installExtensions();
  }

  // Initialize the state of signing requests
  if (settings.allowSigningRequests) {
    enableSigningRequests();
    log.info('signing requests');
  }

  // Establish tray menu
  initMenu(settings);

  // Establish the main window
  initManager('/');

  // Establish the protocol handler window
  initProtocolHandler();

  pHandler.webContents.once('dom-ready', () => {
    initSessionManager();
  });

  if (process.platform === 'win32' || process.platform === 'linux') {
    uri = process.argv && process.argv.slice(1)[0];
  }
  if (uri) {
    if (uri.startsWith('esr')) {
      setTimeout(() => {
        handleUri(resourcePath, store, mainWindow, pHandler, uri);
      }, 2000);
    }
  }
});
app.on('activate', (e, hasVisibleWindows) => {
  showManager();
  showMain();
});
app.on('open-url', (e, url) => {
  if (pHandler) {
    if (url.startsWith('esr')) {
      handleUri(resourcePath, store, mainWindow, pHandler, url);
    }
  } else {
    uri = url;
  }
});
app.on('before-quit', () => {
  log.info('anchor: before-quit');
  if (initHardwareRetry) {
    clearInterval(initHardwareRetry);
  }
  if (sHandler && sHandler.manager) {
    sHandler.manager.disconnect();
  }
  pHandler.close();
});
app.on('will-quit', () => {
  // If this is a development version, always unregister protocols
  if (process.env.NODE_ENV === 'development') {
    disableSigningRequests();
  }
  log.info('anchor: will-quit');
});
app.on('quit', () => { log.info('anchor: quit'); });

const initManager = (route = '/', closable = true) => {
  if (process.platform === 'win32' || process.platform === 'linux') {
    uri = process.argv && process.argv.slice(1)[0];
  }
  mainWindow = createInterface(resourcePath, route, closable, store, uri, pHandler);
  mainWindow.on('close', () => {
    mainWindow = null;
  });
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    log.info('development mode enabled');
    mainWindow.webContents.on('did-frame-finish-load', async () => {
      mainWindow.webContents.once('devtools-opened', () => {
        mainWindow.focus();
      });
      mainWindow.webContents.openDevTools();
    });
  }
};

const initMenu = (settings) => {
  // Initialize the menu
  menu = createTray(resourcePath);
  // Set the tray/dock based on settings
  setBackgroundMode(settings.backgroundMode);
};

const initProtocolHandler = (request = false) => {
  pHandler = createProtocolHandlers(resourcePath, store, request);
};

const showManager = () => {
  if (mainWindow) {
    mainWindow.show();
  }
  if (!mainWindow) {
    initManager();
  }
};

let initHardwareRetry;

// Lock to prevent multiple session handlers from starting at once
let initializingSessionManager = false;

const initSessionManager = async () => {
  // Only run if the lock isn't true
  if (!initializingSessionManager) {
    // Enable the lock indicating a connection is in progress
    initializingSessionManager = true;
    // Disconnect if an existing handler is already running
    if (sHandler && sHandler.manager && sHandler.manager.disconnect) {
      sHandler.manager.disconnect();
    }
    // Create new Session Manager
    sHandler = new SessionManager(store, pHandler);
    // Connect the session manager
    sHandler.manager.connect();
    // Release the lock
    initializingSessionManager = false;
  }
};

const initHardwareLedger = (e, signPath, devicePath) => {
  if (initHardwareRetry) {
    clearInterval(initHardwareRetry);
  }
  Transport
    .open(devicePath)
    .then((transport) => {
      if (process.env.NODE_ENV === 'development') {
        transport.setDebugMode(true);
      }
      global.hardwareLedger.destroy();
      global.hardwareLedger = new HardwareLedger(transport);
      store.dispatch({
        payload: {
          devicePath,
          signPath
        },
        type: types.HARDWARE_LEDGER_TRANSPORT_SUCCESS
      });
      store.dispatch(getAppConfiguration());
      return true;
    })
    .catch((error) => {
      initHardwareRetry = setInterval(initHardwareLedger(false, signPath, devicePath), 2000);
      store.dispatch({
        payload: {
          error,
          date: Date.now(),
        },
        type: types.HARDWARE_LEDGER_TRANSPORT_FAILURE,
      });
    });
};

ipcMain.on('connectHardwareLedger', initHardwareLedger);
ipcMain.on('connectSessionManager', initSessionManager);

const enableSigningRequests = () => {
  log.info('enableSigningRequests');
  // TODO: remove eosio:// protocol handler in the future, it conflicts with B1 implementation
  app.setAsDefaultProtocolClient('eosio');
  protocol.registerHttpProtocol('eosio', (req, cb) => {
    log.info('legacy protocol handler: register', req, cb);
  });
  app.setAsDefaultProtocolClient('esr');
  protocol.registerHttpProtocol('esr', (req, cb) => {
    log.info('protocol handler: register', req, cb);
  });
  app.setAsDefaultProtocolClient('anchorwallet');
  protocol.registerHttpProtocol('anchorwallet', (req, cb) => {
    log.info('app handler: register', req, cb);
  });
  app.setAsDefaultProtocolClient('anchor');
  protocol.registerHttpProtocol('anchor', (req, cb) => {
    log.info('app handler: register', req, cb);
  });
};

const disableSigningRequests = () => {
  log.info('disableSigningRequests');
  // TODO: remove eosio:// protocol handler in the future, it conflicts with B1 implementation
  app.removeAsDefaultProtocolClient('eosio');
  protocol.unregisterProtocol('eosio');
  app.removeAsDefaultProtocolClient('esr');
  protocol.unregisterProtocol('esr');
};

function showMain() {
  if (mainWindow) {
    mainWindow.setVisibleOnAllWorkspaces(true);
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setVisibleOnAllWorkspaces(false);
  }
}

function showHandler() {
  if (pHandler) {
    pHandler.setVisibleOnAllWorkspaces(true);
    pHandler.show();
    pHandler.focus();
    pHandler.setVisibleOnAllWorkspaces(false);
  }
}

// Allow ESR Requests from the UI
ipcMain.on('openUri', (event, data) => {
  handleUri(resourcePath, store, mainWindow, pHandler, data, pHandler);
});

// Session management IPC handlers
ipcMain.on('addSession', (event, data) => sHandler.addSession(data));
ipcMain.on('clearSessions', () => sHandler.manager.clearSessions());
ipcMain.on('removeSession', (event, data) => sHandler.removeSession(data));

// Allow for configuration of ESR from the UI
ipcMain.on('enableSigningRequests', enableSigningRequests);
ipcMain.on('disableSigningRequests', disableSigningRequests);

// Allow setting of authorization headers globally
ipcMain.on('setAuthorizationHeader', (e, token, expires) => {
  log.info('setAuthorizationHeader');
  store.dispatch({
    type: types.SET_CONNECTION_DFUSE_ENDPOINT,
    payload: {
      dfuseAuthorization: token,
      dfuseAuthorizationExpires: expires,
    }
  });
});

function setBackgroundMode(mode) {
  switch (mode) {
    default:
    case 'both': {
      if (isMac && app.dock) {
        app.dock.show();
      }
      if (!tray || (tray && tray.isDestroyed())) {
        tray = createTrayIcon(resourcePath, menu);
      }
      break;
    }
    case 'tray': {
      if (isMac && app.dock) {
        app.dock.hide();
      }
      showMain();
      if (!tray || (tray && tray.isDestroyed())) {
        tray = createTrayIcon(resourcePath, menu);
      }
      break;
    }
    case 'dock': {
      if (isMac && app.dock) {
        app.dock.show();
      }
      if (tray) {
        tray.destroy();
      }
      break;
    }
  }
}

ipcMain.on('setBackgroundMode', (e, mode) => {
  setBackgroundMode(mode);
});

let networkStatus = 'online';
ipcMain.on('networkStatusChanged', (e, status) => {
  if (status === 'online' && networkStatus === 'offline') {
    networkStatus = status;
    initSessionManager();
  }
  if (status === 'offline') {
    networkStatus = status;
  }
});

ipcMain.on('linkConnect', () => {
  sHandler.manager.connect();
});

ipcMain.on('linkDisconnect', () => {
  sHandler.manager.disconnect();
});

ipcMain.on('linkRestart', () => {
  initSessionManager();
});

function setAlternativePayment(request) {
  store.dispatch({
    payload: {
      request,
    },
    type: types.SET_ALTERNATIVE_RESOURCE_PAYMENT
  });
}

function clearAlternativePayment() {
  store.dispatch({
    type: types.CLEAR_ALTERNATIVE_RESOURCE_PAYMENT
  });
}

global.hardwareLedger = new HardwareLedger();
global.clearAlternativePayment = clearAlternativePayment;
global.setAlternativePayment = setAlternativePayment;
global.initSessionManager = initSessionManager;
global.initHardwareLedger = initHardwareLedger;
global.showManager = showManager;

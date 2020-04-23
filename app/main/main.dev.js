/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

import { app, crashReporter, ipcMain, protocol } from 'electron';
import "@babel/polyfill";
import { configureStore } from '../shared/store/main/configureStore';
import { createInterface } from '../modules/main/electron';
import { createTray } from '../modules/tray/electron';
import { createTrayIcon } from '../modules/tray/electron/icon';
import { createProtocolHandlers } from '../modules/handler/electron';
import HardwareLedger from '../shared/utils/Hardware/Ledger';
import handleUri from '../shared/utils/UriHandler';
import * as types from '../shared/actions/types';
import { getAppConfiguration, ledgerStartListen } from '../shared/actions/hardware/ledger';

const log = require('electron-log');
const path = require('path');
const Transport = require('@ledgerhq/hw-transport-node-hid').default;

let resourcePath = __dirname;
let mainWindow = null;
let menu = null;
let tray = null;
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

  log.info('anchor: starting with development mode settings')

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
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (process.platform === 'win32' || process.platform === 'linux') {
      uri = argv.slice(1)[0];
    }
    if (mainWindow !== null) {
      handleUri(resourcePath, store, mainWindow, pHandler, uri, pHandler);
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
  // initMenu();

  // Establish the main window
  initManager('/');

  // Establish the protocol handler window
  initProtocolHandler();

  if (process.platform === 'win32' || process.platform === 'linux') {
    uri = process.argv && process.argv.slice(1)[0];
  }

  if (uri) {
    setTimeout(() => {
      handleUri(resourcePath, store, mainWindow, pHandler, uri);
    }, 2000);
  }
});

app.on('window-all-closed', () => {
  log.info('anchor: window-all-closed');
  app.quit();
});
app.on('open-url', (e, url) => {
  if (pHandler) {
    handleUri(resourcePath, store, mainWindow, pHandler, url);
  } else {
    uri = url;
  }
});
app.on('before-quit', () => {
  log.info('anchor: before-quit');
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
    uri = process.argv.slice(1)[0];
  }
  mainWindow = createInterface(resourcePath, route, closable, store, uri, pHandler);
  mainWindow.on('close', () => {
    mainWindow = null;
    pHandler = null;
    app.quit();
  });
};

const initMenu = () => {
  // Initialize the menu
  menu = createTray(resourcePath);
  // Initialize the tray icon
  tray = createTrayIcon(resourcePath, menu);
};

const initProtocolHandler = (request = false) => {
  pHandler = createProtocolHandlers(resourcePath, store, request);
};

const showManager = () => {
  if (!mainWindow) {
    mainWindow = initManager();
  }
};

let initHardwareRetry;

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

const enableSigningRequests = () => {
  log.info('enableSigningRequests');
  // TODO: remove eosio:// protocol handler in the future, it conflicts with B1 implementation
  app.setAsDefaultProtocolClient('eosio');
  protocol.registerHttpProtocol('eosio', (req, cb) => {
    log.info('protocol handler: register', req, cb);
  });
  app.setAsDefaultProtocolClient('esr');
  protocol.registerHttpProtocol('esr', (req, cb) => {
    log.info('protocol handler: register', req, cb);
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

// Allow ESR Requests from the UI
ipcMain.on('openUri', (event, data) => {
  pHandler.webContents.send('openUri', data);
  pHandler.show();
});

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

global.hardwareLedger = new HardwareLedger();
global.initHardwareLedger = initHardwareLedger;
global.showManager = showManager;

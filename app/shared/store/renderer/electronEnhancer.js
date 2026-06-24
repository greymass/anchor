import { ipcRenderer } from 'electron';

import { getCurrentWindow, getGlobal } from '../../electron/remote';

const { globalName } = require('redux-electron-store/src/constants');
const objectMerge = require('redux-electron-store/src/utils/object-merge');
const fillShape = require('redux-electron-store/src/utils/fill-shape');
const setupStore = require('redux-electron-store/src/setup-electron-store');

const defaultParams = {
  filter: true,
  excludeUnfilteredState: false,
  postDispatchCallback: () => null,
  preDispatchCallback: () => null,
  dispatchProxy: null,
  actionFilter: () => true,
};

export const electronEnhancer = overrides => storeCreator => (reducer, providedInitialState) => {
  const params = Object.assign({}, defaultParams, overrides);
  const rendererId = process.guestInstanceId || getCurrentWindow().id;
  const clientId = process.guestInstanceId ? `webview ${rendererId}` : `window ${rendererId}`;
  const isGuest = !!process.guestInstanceId;

  ipcRenderer.send(`${globalName}-register-renderer`, { filter: params.filter, clientId, isGuest });

  const getInitialState = getGlobal(globalName);
  if (!getInitialState) throw new Error('Could not find electronEnhanced redux store in main process');

  const storeData = JSON.parse(getInitialState());
  const preload = params.excludeUnfilteredState ? fillShape(storeData, params.filter) : storeData;
  const initialState = objectMerge(preload, providedInitialState || {});

  const forwarder = action =>
    ipcRenderer.send(`${globalName}-renderer-dispatch`, clientId, JSON.stringify(action));

  const context = {
    params,
    flags: {
      isDispatching: false,
      isUpdating: false,
      forwardOnUpdate: false,
    },
    storeCreator,
    reducer,
    initialState,
    forwarder,
  };

  const store = setupStore(context);
  const dispatcher = context.params.dispatchProxy || store.dispatch;

  ipcRenderer.on(`${globalName}-browser-dispatch`, (event, stringifiedAction) => {
    context.flags.isUpdating = true;
    const action = JSON.parse(stringifiedAction);
    dispatcher(action);
  });

  return store;
};

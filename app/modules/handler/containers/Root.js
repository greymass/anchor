// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import { configureStore } from '../../../shared/store/renderer/configureStore';
import i18n from '../../../shared/i18n';
import { setURI } from '../actions/uri';
import Prompt from './Prompt';

import * as types from '../../../shared/actions/types';

import '../../../shared/app.global.css';

const { ipcRenderer } = require('electron');

const { store } = configureStore();

export default class Root extends Component<Props> {
  render = () => (
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <Prompt />
      </Provider>
    </I18nextProvider>
  );
}

ipcRenderer.on('openUri', (event, data) => store.dispatch(setURI(data)));
ipcRenderer.on('sessionEvent', (event, type, data) => {
  store.dispatch({
    type: types.SYSTEM_SESSIONS_EVENT,
    payload: {
      type,
      event: data
    }
  });
});

const networkStatus = () => {
  const payload = navigator.onLine ? 'online' : 'offline';
  store.dispatch({
    type: types.SYSTEM_NETWORK_STATUS,
    payload,
  });
  ipcRenderer.send('networkStatusChanged', payload);
};

window.addEventListener('online', networkStatus);
window.addEventListener('offline', networkStatus);
networkStatus();

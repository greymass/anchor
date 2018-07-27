// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';
import IdleTimer from 'react-idle-timer';

import { configureStore, history } from '../store/renderer/configureStore';
import i18n from '../i18n';
import UpdaterContainer from './Updater';
import { downloadProgress } from '../actions/app';
import {
  cancelTransaction,
  setTransaction
} from '../actions/transaction';
import { lockWallet } from '../actions/wallet';

import '../app.global.css';

const { ipcRenderer } = require('electron');

const { store } = configureStore();

export default class Root extends Component<Props> {
  constructor(props) {
    super(props);

    this.idleTimer = null;
  }

  render() {
    const Routes = this.props.routes;

    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <IdleTimer
            ref={ref => { this.idleTimer = ref; }}
            element={document}
            onIdle={onIdle}
            timeout={store.getState().settings.idleTimeout || 999999999}
          >
            <UpdaterContainer>
              <ConnectedRouter history={history}>
                <Routes />
              </ConnectedRouter>
            </UpdaterContainer>
          </IdleTimer>
        </Provider>
      </I18nextProvider>
    );
  }
}

function onIdle() {
  if (store.getState().keys.key.length > 0) {
    store.dispatch(lockWallet());
  }
}

ipcRenderer.on('fileOpenCancel', () => {
  store.dispatch(cancelTransaction());
});

ipcRenderer.on('fileOpenData', (event, data) => {
  store.dispatch(setTransaction(data));
});

ipcRenderer.on('downloadProgress', (event, data) => {
  store.dispatch(downloadProgress(data));
});

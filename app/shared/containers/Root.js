// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';

import { configureStore, history } from '../store/renderer/configureStore';
import { downloadProgress } from '../actions/app';
import i18n from '../i18n';
import IdleContainer from './Root/Idle';
import UpdaterContainer from './Root/Updater';

import {
  cancelTransaction,
  setTransaction
} from '../actions/transaction';

import '../app.global.css';

const { ipcRenderer } = require('electron');

const { store } = configureStore();

export default class Root extends Component<Props> {
  render() {
    const Routes = this.props.routes;
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <IdleContainer>
            <UpdaterContainer>
              <ConnectedRouter history={history}>
                <Routes />
              </ConnectedRouter>
            </UpdaterContainer>
          </IdleContainer>
        </Provider>
      </I18nextProvider>
    );
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

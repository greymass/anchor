// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';

import IdleHandler from './IdleHandler';
import { configureStore } from '../store/renderer/configureStore';
import i18n from '../i18n';
import { downloadProgress } from '../actions/app';

import {
  cancelTransaction,
  setTransaction
} from '../actions/transaction';

import '../app.global.css';

const { ipcRenderer } = require('electron');

const { store } = configureStore();

export default class Root extends Component<Props> {
  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <IdleHandler routes={this.props.routes} />
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

// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';

import { configureStore, history } from '../store/renderer/configureStore';
import { cancelTransaction, setTransaction } from '../actions/transaction';
import i18n from '../i18n';
import '../app.global.css';

const { ipcRenderer } = require('electron');

const { store } = configureStore();

export default class Root extends Component<Props> {
  render() {
    const Routes = this.props.routes;
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
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

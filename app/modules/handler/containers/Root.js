// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';

import { configureStore, history } from '../../../shared/store/renderer/configureStore';
import i18n from '../../../shared/i18n';

import '../../../shared/app.global.css';

const { ipcRenderer } = require('electron');
import { setURI } from '../actions/uri';

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

ipcRenderer.on('openUri', (event, data) => {
  console.log(event, data)
  store.dispatch(setURI(data));
});

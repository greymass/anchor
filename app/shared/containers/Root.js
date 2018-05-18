// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';

import { configureStore, history } from '../store/renderer/configureStore';

import i18n from '../i18n';
import '../app.global.css';

const { store } = configureStore();

export default class Root extends Component<Props> {
  render() {
    const Routes = this.props.routes;
    return (
      <AppContainer>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <ConnectedRouter history={history}>
              <Routes />
            </ConnectedRouter>
          </Provider>
        </I18nextProvider>
      </AppContainer>
    );
  }
}

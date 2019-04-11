// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';

import { configureStore, history } from '../../../shared/store/renderer/configureStore';
import i18n from '../../../shared/i18n';
import ScrollToTop from '../../../shared/components/Global/ScrollToTop';

import '../../../shared/app.global.css';

const { store } = configureStore();

export default class Root extends Component<Props> {
  render() {
    const Routes = this.props.routes;
    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <ScrollToTop>
              <Routes />
            </ScrollToTop>
          </ConnectedRouter>
        </Provider>
      </I18nextProvider>
    );
  }
}

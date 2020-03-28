// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';

import { configureStore, history } from '../../../shared/store/renderer/configureStore';
import i18n from '../../../shared/i18n';
import ScrollToTop from '../../../shared/components/Global/ScrollToTop';

import MessageAppError from '../../../shared/components/Global/Message/App/Error';

import '../../../shared/app.global.css';

const { store } = configureStore();

export default class Root extends Component<Props> {
  state = {};

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  componentWillReceiveProps() {
    this.setState({ error: null });
  }

  render() {
    const { error } = this.state;

    const Routes = this.props.routes;

    return (error) ? (
      <I18nextProvider i18n={i18n}>
        <MessageAppError error={error} />
      </I18nextProvider>
    ) : (
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

// @flow
import React, { Component } from 'react';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import i18n from '../../../shared/i18n';
import ScrollToTop from '../../../shared/components/Global/ScrollToTop';
import UpdaterContainer from '../../../shared/containers/Root/Updater';

import MessageAppError from '../../../shared/components/Global/Message/App/Error';

import '../../../shared/app.global.css';

export default class Root extends Component<Props> {
  state = {};

  componentWillReceiveProps() {
    this.setState({ error: null });
  }

  componentDidCatch(error) {
    this.setState({
      error,
    });
  }

  render() {
    const { error } = this.state;
    const Routes = this.props.routes;
    const { store } = this.props;
    return (error) ? (
      <I18nextProvider i18n={i18n}>
        <MessageAppError error={error} />
      </I18nextProvider>
    ) : (
      <Provider store={store}>
        <I18nextProvider i18n={i18n}>
          <UpdaterContainer>
            <ConnectedRouter history={this.props.history} store={this.props.store}>
              <ScrollToTop>
                <Routes />
              </ScrollToTop>
            </ConnectedRouter>
          </UpdaterContainer>
        </I18nextProvider>
      </Provider>
    );
  }
}

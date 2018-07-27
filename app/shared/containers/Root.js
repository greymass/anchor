// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { ConnectedRouter } from 'react-router-redux';
import IdleTimer from 'react-idle-timer';
import debounce from 'lodash/debounce';

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

    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
  }

  _onActive(e) {
    console.log('user is active', e);
    console.log('time remaining', this.idleTimer.getRemainingTime());
  }

  _onIdle(e) {
    console.log('user is idle', e);
    console.log('last active', this.idleTimer.getLastActiveTime());

    if (store.getState()) {
      store.dispatch(lockWallet());
    }
  }

  render() {
    const Routes = this.props.routes;

    return (
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <IdleTimer
            ref={ref => { this.idleTimer = ref; }}
            element={document}
            onActive={this.onActive}
            onIdle={this.onIdle}
            timeout={1000 * 10}
          >
            <UpdaterContainer>
              <ConnectedRouter history={history}>
                <Routes idle={this.state.idle} />
              </ConnectedRouter>
            </UpdaterContainer>
          </IdleTimer>
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

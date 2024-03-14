import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { configureStore, history } from '../../shared/store/renderer/configureStore';
import Root from './containers/Root';
import Routes from './routes';

import {
  accountUpdatedViaCertificate,
  accountUpdatedViaCertificateFailure,
  beginAccountCreate,
  cancelKeyCertificate,
  returnKeyCertificateCode,
  returnKeyCertificateDecrypted,
  returnKeyCertificateFailed,
  returnKeyCertificateWords,
  returnNewAccountKeys,
} from './actions/account';
import { downloadProgress, listPrinters } from '../../shared/actions/app';

const { store } = configureStore();
const { ipcRenderer } = require('electron');

class Index extends Component<Props> {
  render() {
    return (
      <AppContainer>
        <Root
          history={history}
          routes={this.props.routes}
          store={store}
        />
      </AppContainer>
    );
  }
}

Index.childContextTypes = {
  persistor: PropTypes.object
};

const renderApp = routes => {
  render(
    <Index routes={routes} />,
    document.getElementById('root')
  );
};

renderApp(Routes);

if (module.hot) {
  module.hot.accept('./routes', () => {
    const newRoutes = require('./routes');
    renderApp(newRoutes);
  });
}

ipcRenderer.on('listPrinters', (event, printers) => store.dispatch(listPrinters(printers)));
ipcRenderer.on('accountCreate', (event, data) => store.dispatch(beginAccountCreate(data)));
ipcRenderer.on('cancelKeyCertificate', () => store.dispatch(cancelKeyCertificate()));
ipcRenderer.on('returnKeyCertificateWords', (event, words) => store.dispatch(returnKeyCertificateWords(words)));
ipcRenderer.on('returnKeyCertificateDecrypted', (event, cert) => store.dispatch(returnKeyCertificateDecrypted(cert)));
ipcRenderer.on('returnKeyCertificateFailed', (event, error) => store.dispatch(returnKeyCertificateFailed(error)));
ipcRenderer.on('accountUpdatedViaCertificate', (event, status) => store.dispatch(accountUpdatedViaCertificate(status)));
ipcRenderer.on('accountUpdatedViaCertificateFailure', (event, status) => store.dispatch(accountUpdatedViaCertificateFailure(status)));
ipcRenderer.on('returnKeyCertificateCode', (event, code) => store.dispatch(returnKeyCertificateCode(code)));
ipcRenderer.on('returnNewAccountKeys', (
  event,
  chainId,
  accountName,
  active,
  owner
) => store.dispatch(returnNewAccountKeys(chainId, accountName, active, owner)));

ipcRenderer.on('downloadProgress', (event, data) => {
  store.dispatch(downloadProgress(data));
});

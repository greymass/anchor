// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { find } from 'lodash';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import { translate } from 'react-i18next';
import { Button, Checkbox, Container, Form, Input, Message, Popup } from 'semantic-ui-react';

import * as AccountsActions from '../../actions/accounts';
import * as SettingsActions from '../../actions/settings';
import * as ValidateActions from '../../actions/validate';
import * as WalletActions from '../../actions/wallet';
import * as WalletsActions from '../../actions/wallets';

const { ipcRenderer } = require('electron');

class WelcomeImportContainer extends Component<Props> {
  componentWillReceiveProps(nextProps) {
    const { settings, validate } = nextProps;
    if (
      settings.walletInit
      && (validate.NODE === 'SUCCESS' && this.props.validate.NODE === 'PENDING')
    ) {
      const {
        actions,
        history,
      } = this.props;
      const { account, authorization, chainId } = settings;
      if (account && authorization && chainId) {
        actions.useWallet(chainId, account, authorization);
      }
      history.push('/voter');
    }
  }
  handleImport = (event, data) => {
    const {
      actions,
    } = this.props;
    try {
      const {
        networks,
        settings,
        wallets,
      } = JSON.parse(data);
      networks.forEach((network) => {
        if (network && network.schema === 'anchor.v1.network') {
          // actions.importBlockchainFromBackup(network.data);
        } else {
          // unable to import settings
          console.log(network);
        }
      });
      wallets.forEach((wallet) => {
        if (wallet && wallet.schema === 'anchor.v1.wallet') {
          actions.importWalletFromBackup(wallet.data);
        } else {
          // unable to import settings
          console.log(wallet);
        }
      });
      if (settings && settings.schema === 'anchor.v1.settings') {
        actions.validateNode(settings.data.node);
        actions.setSettings(settings.data);
      } else {
        // unable to import settings
        console.log(settings);
      }
    } catch (e) {
      // unable to import
      console.log('error importing', e);
    }
  }
  import = () => {
    const { settings } = this.props;
    ipcRenderer.send(
      'openFile',
      settings.lastFilePath
    );
    ipcRenderer.once('openFileData', this.handleImport);
  }
  render() {
    const {
      t
    } = this.props;
    return (
      <Button
        color="blue"
        content={t('welcome:welcome_import_wallets')}
        icon="save"
        onClick={this.import}
        size="small"
        style={{ marginTop: '1em' }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    settings: state.settings,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('welcome'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeImportContainer);

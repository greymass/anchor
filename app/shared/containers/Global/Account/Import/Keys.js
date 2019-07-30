// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { map } from 'lodash';
import { Button, Header, Message, Segment, Tab } from 'semantic-ui-react';

import GlobalModalAccountImportPassword from './Password';
import ToolsKeyGeneratorComponent from '../../../../components/Tools/KeyGenerator';

import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalModalAccountImportKeys extends Component<Props> {
  state = {
    // pane: false
    pane: 'generate'
  }
  onClose = () => {
    this.setState({ pane: false }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  }
  onClick = (e, { pane }) => this.setState({ pane })
  render() {
    const {
      settings,
      t,
      wallets,
    } = this.props;
    const {
      pane
    } = this.state;
    let content = (
      <React.Fragment>
        <Segment basic>
          <Header
            content="Create new key pairs"
            subheader="Generate private keys locally using eosjs + Anchor, then encrypt and save them using your password."
          />
          <Button
            color="blue"
            content="Generate key pairs"
            icon="usb"
            pane="generate"
            onClick={this.onClick}
          />
        </Segment>
        <Segment basic>
          <Header
            content="Import keys from a Ledger device"
            subheader="Anchor will import the public keys from your Ledger device and then use the device for signing."
          />
          <Button
            color="blue"
            content="Import keys from Ledger"
            icon="id card"
            pane="ledger"
            onClick={this.onClick}
          />
        </Segment>
      </React.Fragment>
    );
    if (pane) {
      switch (pane) {
        case 'generate':
          content = (
            <React.Fragment>
              <ToolsKeyGeneratorComponent
                {...this.props}
                closeable={true}
                importing
                onKeypair={this.onKeypair}
                onSave={this.onSave}
              />
            </React.Fragment>
          );
          break;
        default:
          break;
      }
    }
    if ([undefined, 'watch', 'ledger'].includes(settings.walletMode) && !settings.walletHash) {
      const hotWalletExists = wallets.some(o => o.mode === 'hot');
      if (!hotWalletExists) {
        content = <GlobalModalAccountImportPassword onClose={this.props.onClose} />;
      }
    }
    return (
      <React.Fragment>
        <Message
          attached="top"
          content="Use the tools below to establish a key pair within Anchor before continuing."
          header="First: Setup Wallet + Key Pairs"
          info
          size="small"
        />
        {content}
      </React.Fragment>
    );
  }
}


function mapStateToProps(state) {
  return {
    // accounts: state.accounts,
    // app: state.app,
    connection: state.connection,
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
    settings: state.settings,
    wallets: state.wallets,
    // system: state.system,
    // validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      // ...AccountsActions,
      // ...SettingsActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportKeys);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Segment, Tab } from 'semantic-ui-react';

import GlobalModalAccountImportHot from './Hot';
import GlobalModalAccountImportLedgerAccounts from './Ledger/Accounts';
import GlobalModalAccountImportWatch from './Watch';

import * as SettingsActions from '../../../../actions/settings';
import * as HardwareLedgerActions from '../../../../actions/hardware/ledger';

class GlobalModalAccountImportExisting extends Component<Props> {
  state = {
    pane: false
  }
  onClose = () => {
    this.setState({ pane: false }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
    });
  }
  onClick = (e, { pane }) => this.setState({ pane })
  enableLedger = () => {
    this.props.actions.setSetting('hardwareLedgerSupport', true);
    this.props.actions.ledgerStartListen();
  }
  render() {
    const {
      status,
      t,
    } = this.props;
    const {
      pane
    } = this.state;
    console.log(this.props)
    if (pane) {
      switch (pane) {
        case 'hot':
          return <GlobalModalAccountImportHot onClose={this.onClose} />;
        case 'ledger':
          return (
            <Tab.Pane>
              <GlobalModalAccountImportLedgerAccounts onClose={this.onClose} />
            </Tab.Pane>
          );
        case 'watch':
          return <GlobalModalAccountImportWatch onClose={this.onClose} />;
        default:
          break;
      }
    }
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content="Import an existing Private Key"
            subheader="Anchor will encrypt your private key locally and then find the EOS accounts matching the public key."
          />
          <Button
            color="blue"
            content="Import Private Key"
            icon="id card"
            pane="hot"
            onClick={this.onClick}
          />
        </Segment>
        <Segment basic>
          <Header
            content="Import an existing Account using a Ledger device"
            subheader="Anchor will encrypt your private key locally and then find the EOS accounts matching the public key."
          />
          {(status === 'connected')
            ? (
              <Button
                color="blue"
                content="Load from Ledger"
                icon="usb"
                pane="ledger"
                onClick={this.onClick}
              />
            )
            : (
              <Button
                color="green"
                content="Enable Ledger Support"
                icon="usb"
                pane="ledger"
                onClick={this.enableLedger}
              />
            )
          }
        </Segment>
        <Segment basic>
          <Header
            content="Import an existing account as a Watch Wallet"
            subheader="A watch wallet is a read-only wallet and doesn't require any key pairs. It can be used with a cold wallet setup for secure signing."
          />
          <Button
            color="blue"
            content="Setup Watch Wallet"
            icon="eye"
            pane="watch"
            onClick={this.onClick}
          />
        </Segment>
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    storage: state.storage,
    // accounts: state.accounts,
    // connection: state.connection,
    ledger: state.ledger,
    // settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
    // system: state.system,
    // validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...HardwareLedgerActions,
      ...SettingsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportExisting);

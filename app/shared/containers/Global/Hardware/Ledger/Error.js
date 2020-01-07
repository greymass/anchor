import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Header, Icon, Segment } from 'semantic-ui-react';

import ToolsHardwareLedgerStatus from '../../../../components/Tools/Hardware/Ledger/Status';
import * as SettingsActions from '../../../../actions/settings';
import Status from './Status';
import * as HardwareLedgerActions from '../../../../actions/hardware/ledger';

const { remote } = require('electron');

export class GlobalHardwareLedgerError extends Component<Props> {
  render() {
    const {
      error,
      status,
      t
    } = this.props;
    if (status === false) {
      return (
        <Segment basic>
          <Header icon size="large" textAlign="center">
            <Icon name="warning sign" />
            <Header.Content>
              Ledger Support not enabled
              <Header.Subheader>
                Enable Ledger support using the dropdown in the top right menu and try your transaction again.
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Segment>
      );
    }
    return (
      <Segment basic size="large">
        <Header size="large">
          <Icon name="warning sign" />
          <Header.Content>
            Cannot find Ledger device
            <Header.Subheader>
              Check the connection to your hardware device.
            </Header.Subheader>
          </Header.Content>
        </Header>
        <p>Anchor was unable to communicate with your Ledger device. Please ensure it is plugged in, and that no other applications are open that might be using it.</p>
        <p>If the device is connected and you are unable to connect to it, try restarting any application using it and potentially even the computer itself.</p>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalHardwareLedgerError);

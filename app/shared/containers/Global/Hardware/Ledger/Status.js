// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Dropdown, Header, Icon, Input, Menu, Popup, Segment, Tab } from 'semantic-ui-react';

import ToolsHardwareLedgerStatus from '../../../../components/Tools/Hardware/Ledger/Status';

import * as HardwareLedgerActions from '../../../../actions/hardware/ledger';

class GlobalHardwareLedgerStatus extends Component<Props> {
  render() {
    const {
      ledger,
      status,
    } = this.props;
    return (
      <Popup
        trigger={(
          <Menu.Item>
            <Icon name='usb' />
          </Menu.Item>
        )}
        content={(
          <ToolsHardwareLedgerStatus
            ledger={ledger}
            status={status}

          />
        )}
        flowing
        on='click'
        position='bottom center'
        size="large"
        style={{ maxWidth: '500px' }}
      />
    );
  }
}

function getStatus(state) {
  let status = false;
  // If the wallet is looking for a Ledger
  if (state.listening) {
    status = 'awaiting_connection';
  }
  // If a transport error occurred
  if (state.transportError && state.transportError.message) {
    const { message } = state.transportError;
    // If the transport is not yet allowed
    if (message.startsWith('cannot open device with path')) {
      status = 'awaiting_allow';
    }
  }
  // If an application error occurred
  if (state.applicationError && state.applicationError.message) {
    const { statusCode } = state.applicationError;
    switch (statusCode) {
      // If the application is not running on the device
      case 28160: {
        status = 'awaiting_application';
        break;
      }
      // Unknown errors
      default: {
        if (state.applicationError && state.applicationError.message) {
          const { message } = state.applicationError;
          // If the transport is not yet allowed
          if (message.startsWith('Cannot write to HID device')) {
            status = 'reinitializing';
          }
        }
        if (!status) {
          console.log('unknown application error code', statusCode, state.applicationError);
          status = 'application_error';
        }
      }
    }
  }
  return status;
}


function mapStateToProps(state) {
  return {
    authorization: state.connection.authorization,
    settings: state.settings,
    ledger: state.ledger,
    status: getStatus(state.ledger),
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...HardwareLedgerActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalHardwareLedgerStatus);

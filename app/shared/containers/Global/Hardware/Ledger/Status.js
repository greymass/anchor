// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Menu, Popup } from 'semantic-ui-react';

import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";

import ToolsHardwareLedgerStatus from '../../../../components/Tools/Hardware/Ledger/Status';
import HardwareLedger from '../../../../utils/Hardware/Ledger';

import * as SettingsActions from '../../../../actions/settings';
import * as HardwareLedgerActions from '../../../../actions/hardware/ledger';

class GlobalHardwareLedgerStatus extends Component<Props> {
  componentDidMount() {
    const { ledger, settings } = this.props;
    if (settings.hardwareLedgerSupport && !ledger.listening) {
      this.props.actions.ledgerStartListen();
    }
  }
  render() {
    const {
      actions,
      ledger,
      settings,
      status,
    } = this.props;
    // Remove icon for other modes
    if (settings.skipImport || settings.walletTemp || settings.walletMode === 'cold') {
      return false;
    }
    // Determine if the Transport has been mangled via page refresh
    const { transport } = new HardwareLedger();
    const transportError = (
      !(transport instanceof TransportNodeHid)
      && ledger.subscriber
      && ledger.devicePath
      && ledger.application
    );
    // If so, popup and ask for restart
    if (transportError) {
      return (
        <Popup
          trigger={(
            <Menu.Item>
              <Icon
                color="orange"
                name="usb"
              />
            </Menu.Item>
          )}
          content={(
            <ToolsHardwareLedgerStatus
              actions={actions}
              ledger={ledger}
              settings={settings}
              status="transport_error"
            />
          )}
          flowing
          on="click"
          open
          position="bottom right"
          size="large"
          style={{
            minWidth: '400px',
            maxWidth: '400px'
          }}
        />
      );
    }
    // Determine icon color
    let color = 'grey';
    let icon = 'usb';
    let loading = false;
    switch (status) {
      case 'connected':
        color = 'green';
        break;
      case 'awaiting_application':
      case 'awaiting_connection':
        color = 'yellow';
        loading = true;
        icon = 'circle notched';
        break;
      default:
        // no default
        break;
    }
    return (
      <Popup
        trigger={(
          <Menu.Item>
            <Icon
              color={color}
              loading={loading}
              name={icon}
            />
          </Menu.Item>
        )}
        content={(
          <ToolsHardwareLedgerStatus
            actions={actions}
            ledger={ledger}
            settings={settings}
            status={status}
          />
        )}
        flowing
        on="click"
        position="bottom right"
        size="large"
        style={{
          minWidth: '400px',
          maxWidth: '400px'
        }}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    authorization: state.connection.authorization,
    ledger: state.ledger,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
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
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalHardwareLedgerStatus);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Icon, Menu, Popup } from 'semantic-ui-react';

import ToolsHardwareLedgerStatus from '../../../../components/Tools/Hardware/Ledger/Status';
import * as SettingsActions from '../../../../actions/settings';
import * as HardwareLedgerActions from '../../../../actions/hardware/ledger';

const { remote } = require('electron');

class GlobalHardwareLedgerStatus extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      open: false,
    };
  }
  componentDidMount() {
    const { ledger, settings } = this.props;
    if (settings.hardwareLedgerSupport && !ledger.listening) {
      this.props.actions.ledgerStartListen();
    }
  }
  componentDidUpdate(prevProps) {
    const { status } = this.props;
    const { init } = this.state;
    if (
      ['awaiting_application', 'awaiting_connection'].includes(prevProps.status)
      && status === 'connected'
    ) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.setState({ open: false }), 1500)
    }
    if (
      ['awaiting_application', 'awaiting_connection'].includes(status)
      && (
        init === false
        || prevProps.status === false
        || prevProps.status === 'connected'
      )
    ) {
      this.setState({ init: true });
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => this.setState({
        open: true,
      }), 1500);
    }
  }
  onClose = () => this.setState({ open: false })
  onOpen = () => this.setState({ open: true })
  render() {
    const {
      actions,
      ledger,
      settings,
      status,
    } = this.props;
    const {
      open
    } = this.state;
    // Remove icon for other modes
    if (settings.skipImport || settings.walletTemp || settings.walletMode === 'cold') {
      return false;
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
              circular
              color={color}
              loading={loading}
              name={icon}
              style={{ margin: 0 }}
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
        open={open}
        onClose={this.onClose}
        onOpen={this.onOpen}
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

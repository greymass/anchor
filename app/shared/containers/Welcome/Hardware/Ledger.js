// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';
import { translate } from 'react-i18next';
import { Button, Container, Dropdown, Form, Input, Message, Segment } from 'semantic-ui-react';
import TransportNodeHid from "@ledgerhq/hw-transport-node-hid";

import * as AccountActions from '../../../actions/accounts';
import * as HardwareLedgerActions from '../../../actions/hardware/ledger';
import * as SettingsActions from '../../../actions/settings';
import * as WalletActions from '../../../actions/wallet';
import * as WalletsActions from '../../../actions/wallets';

import GlobalModalAccountImportLedger from '../../Global/Account/Import/Ledger';
import ToolsHardwareLedgerStatus from '../../../components/Tools/Hardware/Ledger/Status';

class WelcomeHardwareLedgerContainer extends Component<Props> {
  render() {
    const {
      actions,
      ledger,
      onClose,
      onComplete,
      settings,
      status,
      t
    } = this.props;
    let element = (
      <React.Fragment>
        <ToolsHardwareLedgerStatus
          actions={actions}
          ledger={ledger}
          settings={settings}
          status={status}
        />
        <Segment basic textAlign="center">
          <Button
            content={t('welcome_account_lookup_ledger_cancel')}
            icon="x"
            onClick={onClose}
          />
        </Segment>
      </React.Fragment>
    );
    const transportError = !(
      ledger.transport instanceof TransportNodeHid
      || ledger.transport === null
    );
    // If so, popup and ask for restart
    if (transportError) {
      return (
        <ToolsHardwareLedgerStatus
          actions={actions}
          ledger={ledger}
          settings={settings}
          status="transport_error"
        />
      );
    }
    if (status === 'connected' && !transportError) {
      element = (
        <GlobalModalAccountImportLedger
          onClose={onClose}
          onComplete={onComplete}
        />
      );
    }
    return (
      <React.Fragment>
        {element}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    ledger: state.ledger,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...HardwareLedgerActions,
      ...SettingsActions,
      ...WalletActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('welcome'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeHardwareLedgerContainer);

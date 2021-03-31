// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Segment, Tab } from 'semantic-ui-react';

import GlobalModalAccountImportHot from './Hot';
import GlobalModalAccountImportLedgerAccounts from './Ledger/Accounts';
import GlobalModalAccountImportManual from './Manual';
import GlobalModalAccountImportWatch from './Watch';

import * as SettingsActions from '../../../../actions/settings';
import * as HardwareLedgerActions from '../../../../actions/hardware/ledger';

class GlobalModalAccountImportExisting extends Component<Props> {
  state = {
    pane: false
  }
  onClose = () => {
    this.setState({ pane: false });
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  onClick = (e, { pane }) => this.setState({ pane })
  enableLedger = () => {
    this.props.actions.setSetting('hardwareLedgerSupport', true);
    this.props.actions.ledgerStartListen();
  }
  render() {
    const {
      connection,
      settings,
      status,
      t,
    } = this.props;
    const {
      pane
    } = this.state;
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
        case 'manual':
          return <GlobalModalAccountImportManual onClose={this.onClose} />;
        default:
          break;
      }
    }
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content={t('global_account_import_exist_header_one')}
            subheader={t('global_account_import_exist_subheader_one', { connectionChain: connection.chain })}
          />
          <Button
            color="blue"
            content={t('global_account_import_exist_button_one')}
            icon="id card"
            pane="hot"
            onClick={this.onClick}
          />
        </Segment>
        <Segment basic>
          <Header
            content={t('global_account_import_exist_header_two')}
            subheader={t('global_account_import_exist_subheader_two', { connectionChain: connection.chain })}
          />
          {(status === 'connected')
            ? (
              <Button
                color="blue"
                content={t('global_account_import_exist_button_two')}
                icon="usb"
                pane="ledger"
                onClick={this.onClick}
              />
            )
            : (
              <Button
                color="green"
                content={t('global_account_import_exist_button_three')}
                icon="usb"
                pane="ledger"
                onClick={this.enableLedger}
              />
            )
          }
        </Segment>
        <Segment basic>
          <Header
            content={t('global_account_import_exist_header_three')}
            subheader={t('global_account_import_exist_header_four')}
          />
          <Button
            color="blue"
            content={t('global_account_import_exist_button_four')}
            icon="eye"
            pane="watch"
            onClick={this.onClick}
          />
        </Segment>
        {(settings.advancedOptions)
          ? (
            <Segment basic>
              <Header
                content={t('global_account_import_exist_header_five')}
                subheader={t('global_account_import_exist_subheader_five')}
              />
              <Button
                color="blue"
                content={t('global_account_import_exist_button_five')}
                icon="write"
                pane="manual"
                onClick={this.onClick}
              />
            </Segment>
          )
          : false
        }
      </Tab.Pane>
    );
  }
}


function mapStateToProps(state) {
  return {
    storage: state.storage,
    connection: state.connection,
    ledger: state.ledger,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
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
  withTranslation('global', {
    withRef: true
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportExisting);

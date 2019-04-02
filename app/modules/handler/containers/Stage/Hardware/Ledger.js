// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import ReactJson from 'react-json-view';
import { Button, Dimmer, Loader, Grid, Header, Icon, Label, Message, Modal, Placeholder, Segment } from 'semantic-ui-react';

import PromptControls from '../../../components/Review/Controls';
import * as SettingsActions from '../../../../../shared/actions/settings';
import * as HardwareLedgerActions from '../../../../../shared/actions/hardware/ledger';

import ToolsHardwareLedgerStatus from '../../../../../shared/components/Tools/Hardware/Ledger/Status';

class PromptStageHardwareLedger extends Component<Props> {
  render() {
    const {
      actions,
      ledger,
      prompt,
      settings,
      status,
      wallet,
    } = this.props;
    const {
      chainId,
      callback,
    } = prompt;
    return (
      <Grid stackable>
        <Grid.Column width={6}>
          <PromptControls
            callback={callback}
            chainId={chainId}
            onSelect={this.props.swapAccount}
            wallet={wallet}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Header>
            Device not ready...
            <Header.Subheader>
              Please follow the steps below to connect your hardware signing device.
            </Header.Subheader>
          </Header>
          <ToolsHardwareLedgerStatus
            actions={actions}
            hideOptions
            ledger={ledger}
            settings={settings}
            status={status}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
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
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(PromptStageHardwareLedger);

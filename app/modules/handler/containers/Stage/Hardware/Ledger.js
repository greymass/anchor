// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header } from 'semantic-ui-react';

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
      t,
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
            {t('handler_containers_stage_hardware_ledger_header')}
            <Header.Subheader>
              {t('handler_containers_stage_hardware_ledger_subheader')}
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
  withTranslation('handler'),
  connect(mapStateToProps, mapDispatchToProps)
)(PromptStageHardwareLedger);

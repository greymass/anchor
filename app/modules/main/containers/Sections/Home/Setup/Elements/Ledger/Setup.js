// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Segment } from 'semantic-ui-react';

import ToolsHardwareLedgerStatus from '../../../../../../../../shared/components/Tools/Hardware/Ledger/Status';
import * as HardwareLedgerActions from '../../../../../../../../shared/actions/hardware/ledger';

class AccountSetupElementsLedgerSetup extends Component<Props> {
  render() {
    const {
      actions,
      ledger,
      settings,
      status,
    } = this.props;
    return (
      <React.Fragment>
        <ToolsHardwareLedgerStatus
          actions={actions}
          ledger={ledger}
          settings={settings}
          status={status}
        />
        <Segment basic>
          <p><em>Tip: If you are having issues connecting your Ledger to Anchor, try disabling and renabling the service with the button above. Also make sure no other applications are trying to use the device.</em></p>
        </Segment>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    accountcreate: state.accountcreate,
    ledger: state.ledger,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...HardwareLedgerActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(AccountSetupElementsLedgerSetup);

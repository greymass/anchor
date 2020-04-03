// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsLedgerComponent from '../../../../../shared/components/Tools/Hardware/Ledger';

import * as LedgerActions from '../../../../../shared/actions/hardware/ledger';

class ToolsLedger extends Component<Props> {
  render = () => (
    <ToolsLedgerComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    connection: state.connection,
    ledger: state.ledger,
    settings: state.settings,
    status: LedgerActions.ledgerGetStatus(state.ledger),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...LedgerActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsLedger));

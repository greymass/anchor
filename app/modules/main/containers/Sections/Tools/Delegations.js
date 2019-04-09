// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsDelegationsComponent from '../../../../../shared/components/Tools/Delegations';

import * as StakeActions from '../../../../../shared/actions/stake';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../../shared/actions/table';
import * as WalletActions from '../../../../../shared/actions/wallet';

class ToolsDelegations extends Component<Props> {
  render = () => (
    <ToolsDelegationsComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    connection: state.connection,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsDelegations));

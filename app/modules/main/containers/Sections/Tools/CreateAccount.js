// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsCreateAccountComponent from '../../../../../shared/components/Tools/CreateAccount';

import * as systemActions from '../../../../../shared/actions/system/systemstate';
import * as createAccountActions from '../../../../../shared/actions/createaccount';

class ToolsCrosschainTransfer extends Component<Props> {
  render = () => (
    <ToolsCreateAccountComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    allBlockExplorers: state.blockExplorers,
    balances: state.blockchains,
    connection: state.connection,
    globals: state.globals,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...createAccountActions,
      ...systemActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsCrosschainTransfer));

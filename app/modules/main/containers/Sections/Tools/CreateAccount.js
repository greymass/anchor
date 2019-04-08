// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsCreateAccountComponent from '../../../../../shared/components/Tools/CreateAccount';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as CreateAccountActions from '../../../../../shared/actions/createaccount';
import * as GlobalsActions from '../../../../../shared/actions/globals';
import * as NavigationActions from '../../../actions/navigation';
import * as SystemActions from '../../../../../shared/actions/system/systemstate';

class ToolsCrosschainTransfer extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }
  render = () => (
    <ToolsCreateAccountComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  console.log({state})
  return {
    accounts: state.accounts,
    allBlockExplorers: state.blockexplorers,
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
      ...AccountsActions,
      ...CreateAccountActions,
      ...GlobalsActions,
      ...NavigationActions,
      ...SystemActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsCrosschainTransfer));

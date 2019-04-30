// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import ToolsCreateAccountComponent from '../../../../../shared/components/Tools/CreateAccount';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as CreateAccountActions from '../../../../../shared/actions/createaccount';
import * as GlobalsActions from '../../../../../shared/actions/globals';
import * as SystemActions from '../../../../../shared/actions/system/systemstate';

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
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    connection: state.connection,
    globals: state.globals,
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
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
      ...SystemActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsCrosschainTransfer));

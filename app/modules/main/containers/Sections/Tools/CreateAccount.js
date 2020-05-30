// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsCreateAccountComponent from '../../../../../shared/components/Tools/CreateAccount';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as CreateAccountActions from '../../../../../shared/actions/createaccount';
import * as GlobalsActions from '../../../../../shared/actions/globals';
import * as SystemActions from '../../../../../shared/actions/system/systemstate';
import * as WalletActions from '../../../../../shared/actions/wallet';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsCrosschainTransfer extends Component<Props> {
  render = () => (
    <ToolsCreateAccountComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    accounts: state.accounts,
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    connection: state.connection,
    globals: state.globals,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...CreateAccountActions,
      ...GlobalsActions,
      ...SystemActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(
  makeMapStateToProps,
  mapDispatchToProps
)(ToolsCrosschainTransfer));

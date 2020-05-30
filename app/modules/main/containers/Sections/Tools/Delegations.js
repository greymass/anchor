// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsDelegationsComponent from '../../../../../shared/components/Tools/Delegations';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as StakeActions from '../../../../../shared/actions/stake';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../../shared/actions/table';
import * as WalletActions from '../../../../../shared/actions/wallet';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsDelegations extends Component<Props> {
  render = () => (
    <ToolsDelegationsComponent
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
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    validate: state.validate,
    wallet: state.wallet,
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsDelegations));

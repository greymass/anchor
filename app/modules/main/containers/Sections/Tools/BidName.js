// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsBidNameComponent from '../../../../../shared/components/Tools/BidName';

import * as BidNameActions from '../../../../../shared/actions/system/bidname';
import * as NameBidsActions from '../../../../../shared/actions/namebids';
import * as TableActions from '../../../../../shared/actions/table';
import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as WalletActions from '../../../../../shared/actions/wallet';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsBidName extends Component<Props> {
  render = () => (
    <ToolsBidNameComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    accounts: state.accounts,
    balances: state.balances,
    blockExplorers: state.blockExplorers,
    connection: state.connection,
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
      ...BidNameActions,
      ...NameBidsActions,
      ...SystemStateActions,
      ...TableActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsBidName));

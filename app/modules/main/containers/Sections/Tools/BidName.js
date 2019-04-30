// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import ToolsBidNameComponent from '../../../../../shared/components/Tools/BidName';

import * as BidNameActions from '../../../../../shared/actions/system/bidname';
import * as NameBidsActions from '../../../../../shared/actions/namebids';
import * as TableActions from '../../../../../shared/actions/table';
import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';

class ToolsBidName extends Component<Props> {
  render = () => (
    <ToolsBidNameComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    balances: state.balances,
    blockExplorers: state.blockExplorers,
    connection: state.connection,
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
      ...BidNameActions,
      ...NameBidsActions,
      ...SystemStateActions,
      ...TableActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsBidName));

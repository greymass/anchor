// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsBidNameComponent from '../../../../../shared/components/Tools/BidName';

import * as NameBidsActions from '../../../../../shared/actions/namebids';
import * as BidNameActions from '../../../../../shared/actions/system/bidname';

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
      ...NameBidsActions,
      ...BidNameActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsBidName));

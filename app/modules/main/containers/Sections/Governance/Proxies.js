// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Proxies from '../../../../../shared/components/Producers/Proxies';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as TableActions from '../../../../../shared/actions/table';
import * as VoteProducerActions from '../../../../../shared/actions/system/voteproducer';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';

class GovernenceProxiesContainer extends Component<Props> {
  render() {
    return (
      <Proxies
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    actions: state.actions,
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    blockchains: state.blockchains,
    connection: state.connection,
    globals: state.globals,
    history: state.history,
    keys: state.keys,
    navigation: state.navigation,
    producers: state.producers,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...SystemStateActions,
      ...TableActions,
      ...VoteProducerActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernenceProxiesContainer));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import Producers from '../../../../../shared/components/Producers';

import * as ProducersActions from '../../../../../shared/actions/producers';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../../shared/actions/table';
import * as VoteProducerActions from '../../../../../shared/actions/system/voteproducer';
import * as WalletActions from '../../../../../shared/actions/wallet';

class GovernenceProducersContainer extends Component<Props> {
  render() {
    return (
      <Producers
        {...this.props}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    blockchains: state.blockchains,
    connection: state.connection,
    globals: state.globals,
    history: state.history,
    producers: state.producers,
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
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
      ...ProducersActions,
      ...SystemStateActions,
      ...TableActions,
      ...VoteProducerActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernenceProducersContainer));

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
import * as WalletActions from '../../../../../shared/actions/wallet';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class GovernenceProxiesContainer extends Component<Props> {
  render() {
    return (
      <Proxies
        {...this.props}
      />
    );
  }
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    accounts: state.accounts,
    actions: state.actions,
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    blockchains: state.blockchains,
    connection: state.connection,
    globals: state.globals,
    history: state.history,
    navigation: state.navigation,
    producers: state.producers,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...SystemStateActions,
      ...TableActions,
      ...VoteProducerActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(GovernenceProxiesContainer));

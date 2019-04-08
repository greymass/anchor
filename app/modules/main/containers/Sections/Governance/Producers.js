// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Producers from '../../../../../shared/components/Producers';

import * as ProducersActions from '../../../../../shared/actions/producers';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TableActions from '../../../../../shared/actions/table';
import * as NavigationActions from '../../../actions/navigation';

class GovernenceProducersContainer extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }

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
    actions: state.actions,
    allBlockExplorers: state.blockexplorers,
    balances: state.balances,
    blockchains: state.blockchains,
    connection: state.connection,
    globals: state.globals,
    history: state.history,
    keys: state.keys,
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
      ...NavigationActions,
      ...ProducersActions,
      ...SystemStateActions,
      ...TableActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernenceProducersContainer));

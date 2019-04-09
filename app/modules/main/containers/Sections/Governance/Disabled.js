// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Grid, Header, Segment } from 'semantic-ui-react';

class GovernenceDisabled extends Component<Props> {
  render() {
    return (
      <Segment>
        Governance not available on this chain.
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    // accounts: state.accounts,
    // actions: state.actions,
    // allBlockExplorers: state.blockexplorers,
    // balances: state.balances,
    blockchains: state.blockchains,
    // connection: state.connection,
    // globals: state.globals,
    // history: state.history,
    // keys: state.keys,
    // producers: state.producers,
    settings: state.settings,
    // system: state.system,
    // tables: state.tables,
    // transaction: state.transaction,
    // validate: state.validate,
    // wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GovernenceDisabled));

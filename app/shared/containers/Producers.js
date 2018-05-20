// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Producers from '../components/Producers';
import * as AccountsActions from '../actions/accounts';
import * as ProducersActions from '../actions/producers';
import * as SettingsActions from '../actions/settings';
import * as WalletActions from '../actions/wallet';

type Props = {};

class ProducerContainer extends Component<Props> {
  props: Props;

  render() {
    return (
      <Producers {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    producers: state.producers,
    settings: state.settings,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...ProducersActions,
      ...SettingsActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProducerContainer));

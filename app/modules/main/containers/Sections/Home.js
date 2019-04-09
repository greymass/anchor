// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HomeAccountsContainer from './Home/Accounts';
import HomeBlockchainContainer from './Home/Blockchain';
import HomeBlockchainsContainer from './Home/Blockchains';
import OverviewContainer from './Overview';

class HomeContainer extends Component<Props> {
  render() {
    const {
      settings,
      wallets,
    } = this.props;
    if (!settings.walletInit) {
      return <HomeBlockchainsContainer />;
    }
    if (!settings.chainId) {
      return <HomeBlockchainContainer />;
    }
    if (!wallets || wallets.length === 0) {
      return <HomeAccountsContainer />;
    }
    return <OverviewContainer />;
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    wallets: state.wallets.filter(w => (w.chainId === state.settings.chainId))
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));

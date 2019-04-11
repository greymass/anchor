// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ColdWalletContainer from './ColdWallet';
import GlobalBlockchainManage from '.../../../shared/containers/Global/Blockchain/Manage';
import HomeAccountsContainer from './Home/Accounts';
import HomeInitializeContainer from './Home/Initialize';
import OverviewContainer from './Overview';

class HomeContainer extends Component<Props> {
  render() {
    const {
      settings,
      wallets,
    } = this.props;
    if (!settings.walletInit) {
      return <HomeInitializeContainer />;
    }
    if (!settings.chainId || settings.blockchains.length === 0) {
      return <GlobalBlockchainManage />;
    }
    if (!wallets || wallets.length === 0) {
      return <HomeAccountsContainer />;
    }
    if (settings.walletMode === 'cold') {
      return <ColdWalletContainer />
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

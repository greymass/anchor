// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

import WalletStakeContainer from './Wallet/Stake';
import WalletTransferContainer from './Wallet/Transfer';
import NavigationWalletContainer from '../Navigation/Wallet';

class WalletContainer extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <NavigationWalletContainer />
        <HashRouter>
          <Switch>
            <Route exact path="/wallet" component={WalletTransferContainer} />
            <Route path="/wallet/stake" component={WalletStakeContainer} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WalletContainer));

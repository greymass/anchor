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

import AccountSetupBackup from './Home/Setup/Backup';
import AccountSetupCode from './Home/Setup/Code';
import AccountSetupCreate from './Home/Setup/Create';
import AccountSetupHome from './Home/Setup/Account';
import AccountSetupImport from './Home/Setup/Import';
import AccountSetupRecover from './Home/Setup/Recover';
import ColdWalletContainer from './ColdWallet';
import GlobalBlockchainChoose from '../../../../shared/containers/Global/Blockchain/Choose';
import GlobalBlockchainManage from '../../../../shared/containers/Global/Blockchain/Manage';
import HomeAccountsContainer from './Home/Accounts';
import HomeInitializeContainer from './Home/Initialize';
import HomePasswordContainer from './Home/Password';
import HomeSigningRequestPrompt from './Home/SigningRequestPrompt';
import HomeUpgradeContainer from './Home/Upgrade';
import OverviewContainer from './Overview';

class HomeContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.checkForRedirect();
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkForRedirect();
    }
  }
  checkForRedirect = () => {
    const {
      history,
      settings,
      wallets,
    } = this.props;
    const matchingWallets = wallets.filter(w => (w.chainId === settings.chainId));
    if (!this.props.location.pathname.startsWith('/home/account')) {
      if (!settings.walletInit) {
        history.push('/home/init');
      } else if (!settings.walletHash) {
        history.push('/home/password');
      } else if (settings.walletHash && (!settings.chainId || settings.blockchains.length === 0)) {
        history.push('/home/blockchain');
      } else if (!matchingWallets || matchingWallets.length === 0) {
        history.push('/home/accounts');
      } else if (settings.walletMode === 'cold') {
        history.push('/home/coldwallet');
      }
    }
  };
  render() {
    const {
      settings,
      storage,
      wallets,
    } = this.props;
    const esrPromptReady = (
      wallets.length > 0
      && settings.walletMode !== 'cold'
      && !settings.promptSigningRequests
    );
    const earlierVersion = wallets.filter(w => w.data && w.version === 1 && w.mode === 'hot').length > 0;
    const upgradable = (
      wallets.length > 0
      && settings.walletHash
      && earlierVersion
    );
    let interrupt;
    if (esrPromptReady) {
      interrupt = <HomeSigningRequestPrompt />;
    }
    if (upgradable) {
      interrupt = <HomeUpgradeContainer />;
    }
    return (
      <React.Fragment>
        {interrupt}
        <HashRouter>
          <Switch>
            <Route exact path="/" component={OverviewContainer} />
            <Route path="/home/account/backup/:chain_id/:account_name/:first_account?" component={AccountSetupBackup} />
            <Route path="/home/account/code" component={AccountSetupCode} />
            <Route path="/home/account/create" component={AccountSetupCreate} />
            <Route path="/home/account/import" component={AccountSetupImport} />
            <Route path="/home/account/recover" component={AccountSetupRecover} />
            <Route path="/home/account/setup" component={AccountSetupHome} />
            <Route path="/home/accounts" component={HomeAccountsContainer} />
            <Route path="/home/blockchains/:chain_id" component={GlobalBlockchainManage} />
            <Route path="/home/blockchain" component={GlobalBlockchainChoose} />
            <Route path="/home/blockchains" component={GlobalBlockchainManage} />
            <Route path="/home/coldwallet" component={ColdWalletContainer} />
            <Route path="/home/init" component={HomeInitializeContainer} />
            <Route path="/home/password" component={HomePasswordContainer} />
            <Route path="/home/upgrade" component={HomeUpgradeContainer} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    auths: state.auths,
    settings: state.settings,
    storage: state.storage,
    wallets: state.wallets,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({}, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeContainer));

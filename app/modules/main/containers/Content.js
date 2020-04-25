// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import AccountContainer from './Sections/Account';
import DevTestContainer from './Sections/DevTest';
import GovernanceContainer from './Sections/Governance';
import HomeContainer from './Sections/Home';
import TestsContainer from './Sections/Tests';
import ToolsContainer from './Sections/Tools';
import SettingsContainer from './Sections/Settings';
import VersionContainer from './Sections/Version';
import WalletContainer from './Sections/Wallet';
import ToolsWallets from './Sections/Tools/Wallets';
import GlobalBlockchainManage from '../../../shared/containers/Global/Blockchain/Manage';

class ContentContainer extends Component<Props> {
  render = () => (
    <Container fluid>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={HomeContainer} />
          <Route path="/account" component={AccountContainer} />
          <Route path="/home" component={HomeContainer} />
          <Route path="/devtest" component={DevTestContainer} />
          <Route path="/tests" component={TestsContainer} />
          <Route path="/wallet" component={WalletContainer} />
          <Route path="/governance" component={GovernanceContainer} />
          <Route path="/tools" component={ToolsContainer} />
          <Route path="/settings" component={SettingsContainer} />
          <Route path="/version" component={VersionContainer} />
          <Route path="/manage/wallets" component={ToolsWallets} />
          <Route path="/manage/blockchains" component={GlobalBlockchainManage} />
        </Switch>
      </HashRouter>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    settings: state.settings,
    validate: state.validate,
  };
}

export default connect(mapStateToProps)(ContentContainer);

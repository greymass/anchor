// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import GovernanceContainer from './Sections/Governance';
import WalletContainer from './Sections/Wallet';
import ToolsContainer from './Sections/Tools';
import SettingsContainer from './Sections/Settings';
import OverviewContainer from './Sections/Overview';

class ContentContainer extends Component<Props> {
  render = () => (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={OverviewContainer} />
        <Route exact path="/wallet" component={WalletContainer} />
        <Route path="/governance" component={GovernanceContainer} />
        <Route exact path="/tools" component={ToolsContainer} />
        <Route exact path="/settings" component={SettingsContainer} />
      </Switch>
    </HashRouter>
  );
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  };
}

export default connect(mapStateToProps)(ContentContainer);

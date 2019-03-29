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
import TestsContainer from './Sections/Tests';
import ToolsContainer from './Sections/Tools';
import SettingsContainer from './Sections/Settings';
import OverviewContainer from './Sections/Overview';
import { Button, Container, Dimmer, Header, Image, Loader, Segment } from 'semantic-ui-react';

class ContentContainer extends Component<Props> {
  render = () => (
    <React.Fragment>
      <Dimmer
        active={this.props.validate.NODE === 'PENDING'}
        inverted
        style={{
          height: '100vh',
        }}
      >
        <Loader
          size="massive"
        >
          <Header
            content="Establishing Connection"
            subheader={this.props.settings.node}
          />
        </Loader>
      </Dimmer>
      <HashRouter>
        <Switch>
          <Route exact path="/" component={OverviewContainer} />
          <Route path="/tests" component={TestsContainer} />
          <Route path="/wallet" component={WalletContainer} />
          <Route path="/governance" component={GovernanceContainer} />
          <Route path="/tools" component={ToolsContainer} />
          <Route exact path="/settings" component={SettingsContainer} />
        </Switch>
      </HashRouter>
    </React.Fragment>
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

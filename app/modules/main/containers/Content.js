// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import { Container, Dimmer, Header, Loader } from 'semantic-ui-react';

import GovernanceContainer from './Sections/Governance';
import HomeContainer from './Sections/Home';
import TestsContainer from './Sections/Tests';
import ToolsContainer from './Sections/Tools';
import SettingsContainer from './Sections/Settings';
import VersionContainer from './Sections/Version';
import WalletContainer from './Sections/Wallet';

class ContentContainer extends Component<Props> {
  render = () => (
    <Container fluid>
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
          <Route exact path="/" component={HomeContainer} />
          <Route path="/home" component={HomeContainer} />
          <Route path="/tests" component={TestsContainer} />
          <Route path="/wallet" component={WalletContainer} />
          <Route path="/governance" component={GovernanceContainer} />
          <Route path="/tools" component={ToolsContainer} />
          <Route path="/settings" component={SettingsContainer} />
          <Route path="/version" component={VersionContainer} />
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

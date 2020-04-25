// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';

import NavigationGovernanceContainer from '../Navigation/Governance';
import GovernanceProducersContainer from './Governance/Producers';
import GovernanceProposalsContainer from './Governance/Proposals';
import GovernanceProxiesContainer from './Governance/Proxies';

class ContentContainer extends Component<Props> {
  render = () => {
    return (
      <React.Fragment>
        <NavigationGovernanceContainer />
        <HashRouter>
          <Switch>
            <Route exact path="/governance/producers" component={GovernanceProducersContainer} />
            <Route exact path="/governance/proposals" component={GovernanceProposalsContainer} />
            <Route exact path="/governance/proxies" component={GovernanceProxiesContainer} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  };
}

export default connect(mapStateToProps)(ContentContainer);

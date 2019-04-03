// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  HashRouter,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';

import ToolsHome from './Tools/Home';
import ToolsDelegations from './Tools/Delegations';
import ToolsAirgrabs from './Tools/Airgrabs';

class ToolsContainer extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/tools" component={ToolsHome} />
            <Route path="/tools/v1" component={Tools} />
            <Route path="/tools/delegations" component={ToolsDelegations} />
            <Route path="/tools/airgrabs" component={ToolsAirgrabs} />
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsContainer));

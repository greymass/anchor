// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Placeholder, Segment } from 'semantic-ui-react';
import { times } from 'lodash';

import Tools from '../../../../shared/containers/Tools';
import ToolsHome from './Tools/Home';
import ToolsDelegations from './Tools/Delegations';

class ToolsContainer extends Component<Props> {
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route exact path="/tools" component={ToolsHome} />
            <Route path="/tools/delegations" component={ToolsDelegations} />
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

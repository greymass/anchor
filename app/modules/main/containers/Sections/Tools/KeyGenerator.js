// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsKeyGeneratorComponent from '../../../../../shared/components/Tools/Keys';
import * as NavigationActions from '../../../actions/navigation';

class ToolsDelegations extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }

  render = () => (
    <ToolsKeyGeneratorComponent
      {...this.props}
    />
  )
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions
    }, dispatch)
  };
}

function mapStateToProps(state) {
  return {
    connection: state.connection
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsDelegations));

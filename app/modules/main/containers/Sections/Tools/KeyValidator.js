// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsKeyValidatorComponent from '../../../../../shared/components/Tools/Keys/Validator';
import * as NavigationActions from '../../../actions/navigation';

class ToolsDelegations extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }

  render = () => (
    <ToolsKeyValidatorComponent
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

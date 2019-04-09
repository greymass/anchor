// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsGlobalsStateComponent from '../../../../../shared/components/Tools/State/Globals';

class ToolsGlobalsState extends Component<Props> {
  render = () => (
    <ToolsGlobalsStateComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    globals: state.globals
  };
}

export default withRouter(connect(mapStateToProps)(ToolsGlobalsState));

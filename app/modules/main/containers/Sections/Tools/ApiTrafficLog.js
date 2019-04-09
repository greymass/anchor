// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsApiTrafficLogComponent from '../../../../../shared/components/Tools/System/Log';

class ToolsApiTrafficLog extends Component<Props> {
  render = () => (
    <ToolsApiTrafficLogComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    systemlog: state.systemlog
  };
}

export default withRouter(connect(mapStateToProps)(ToolsApiTrafficLog));

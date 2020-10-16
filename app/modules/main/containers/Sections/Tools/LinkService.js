// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsLinkServiceComponent from '../../../../../shared/components/Tools/LinkService';

class ToolsLinkService extends Component<Props> {
  render = () => (
    <ToolsLinkServiceComponent {...this.props} />
  )
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    sessions: state.sessions,
  };
}

export default withRouter(connect(mapStateToProps)(ToolsLinkService));

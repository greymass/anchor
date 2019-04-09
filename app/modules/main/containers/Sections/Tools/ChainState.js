// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsChainStateComponent from '../../../../../shared/components/Tools/State/Chain';

class ToolsChainState extends Component<Props> {
  render = () => (
    <ToolsChainStateComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    chain: state.chain
  };
}

export default withRouter(connect(mapStateToProps)(ToolsChainState));

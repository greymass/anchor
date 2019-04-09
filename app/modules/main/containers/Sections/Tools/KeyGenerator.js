// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsKeyGeneratorComponent from '../../../../../shared/components/Tools/Keys';

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

function mapStateToProps(state) {
  return {
    connection: state.connection
  };
}

export default withRouter(connect(mapStateToProps)(ToolsDelegations));

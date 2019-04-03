// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsKeyValidatorComponent from '../../../../../shared/components/Tools/Keys/Validator';

class ToolsDelegations extends Component<Props> {
  render = () => (
    <ToolsKeyValidatorComponent
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

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsResetApplicationComponent from '../../../../../shared/components/Tools/Reset';

class ToolsResetApplication extends Component<Props> {
  render = () => (
    <ToolsResetApplicationComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    wallet: state.wallet
  };
}

export default withRouter(connect(mapStateToProps)(ToolsResetApplication));

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsWalletStateComponent from '../../../../../shared/components/Tools/State/Wallet';

class ToolsWalletsState extends Component<Props> {
  render = () => (
    <ToolsWalletStateComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

export default withRouter(connect(mapStateToProps)(ToolsWalletsState));

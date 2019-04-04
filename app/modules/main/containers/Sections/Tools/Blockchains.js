// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsBlockchainsComponent from '../../../../../shared/components/Tools/Blockchains';

class ToolsPermissions extends Component<Props> {
  render = () => (
    <ToolsBlockchainsComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    settings: state.settings,
    wallets: state.wallets
  };
}

export default withRouter(connect(mapStateToProps)(ToolsPermissions));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsKeyGeneratorComponent from '../../../../../shared/components/Tools/KeyGenerator';

import * as WalletsActions from '../../../../../shared/actions/wallets';

class ToolsKeyGenerator extends Component<Props> {
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


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletsActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsKeyGenerator));

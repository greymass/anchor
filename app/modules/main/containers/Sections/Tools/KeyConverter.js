// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsKeyConverterComponent from '../../../../../shared/components/Tools/KeyConverter';

class ToolsKeyGenerator extends Component<Props> {
  render = () => (
    <ToolsKeyConverterComponent
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

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsKeyGenerator));

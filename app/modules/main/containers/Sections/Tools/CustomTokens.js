// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsCustomTokensComponent from '../../../../../shared/components/Tools/CustomTokens';

import * as CustomTokensActions from '../../../../../shared/actions/customtokens';

class ToolsCustomTokens extends Component<Props> {
  render = () => (
    <ToolsCustomTokensComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    customtokens: state.customtokens,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...CustomTokensActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsCustomTokens));

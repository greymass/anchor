// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsCustomTokensComponent from '../../../../../shared/components/Tools/CustomTokens';

import * as CustomTokensActions from '../../../../../shared/actions/customtokens';
import * as NavigationActions from '../../../actions/navigation';

class ToolsCustomTokens extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }

  render = () => (
    <ToolsCustomTokensComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    balances: state.balances,
    blockchains: state.blockchains,
    connection: state.connection,
    customtokens: state.customtokens,
    globals: state.globals,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...CustomTokensActions,
      ...NavigationActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsCustomTokens));

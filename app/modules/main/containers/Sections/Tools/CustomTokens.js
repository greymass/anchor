// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsCustomTokensComponent from '../../../../../shared/components/Tools/CustomTokens';

import * as AccountsActions from '../../../../../shared/actions/accounts';
import * as CustomTokensActions from '../../../../../shared/actions/customtokens';
import * as SettingsActions from '../../../../../shared/actions/settings';

class ToolsCustomTokens extends Component<Props> {
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
      ...AccountsActions,
      ...CustomTokensActions,
      ...SettingsActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsCustomTokens));

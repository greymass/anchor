// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsPermissionsComponent from '../../../../../shared/components/Tools/Permissions';

import * as AuthsActions from '../../../../../shared/actions/system/updateauth';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';

class ToolsPermissions extends Component<Props> {
  render = () => (
    <ToolsPermissionsComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    blockExplorers: state.blockExplorers,
    connection: state.connection,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AuthsActions,
      ...SystemStateActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsPermissions));

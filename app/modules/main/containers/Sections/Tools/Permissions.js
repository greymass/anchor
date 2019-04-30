// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import ToolsPermissionsComponent from '../../../../../shared/components/Tools/Permissions';

import * as AuthsActions from '../../../../../shared/actions/system/updateauth';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as WalletActions from '../../../../../shared/actions/wallet';

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
    pubkeys: {
      available: state.storage.keys,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
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
      ...SystemStateActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsPermissions));

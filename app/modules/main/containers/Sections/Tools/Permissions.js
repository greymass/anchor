// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsPermissionsComponent from '../../../../../shared/components/Tools/Permissions';

import * as AuthsActions from '../../../../../shared/actions/system/updateauth';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as WalletActions from '../../../../../shared/actions/wallet';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsPermissions extends Component<Props> {
  render = () => (
    <ToolsPermissionsComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    accounts: state.accounts,
    blockExplorers: state.blockExplorers,
    connection: state.connection,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AuthsActions,
      ...SystemStateActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsPermissions));

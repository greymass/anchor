// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import ToolsKeysComponent from '../../../../../shared/components/Tools/Keys';

import * as WalletActions from '../../../../../shared/actions/wallet';
import * as WalletsActions from '../../../../../shared/actions/wallets';
import NavigationActions from '../../../actions/navigation';

class ToolsKeys extends Component<Props> {
  render = () => (
    <ToolsKeysComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    blockchains: state.blockchains,
    connection: state.connection,
    pubkeys: {
      available: state.storage.keys,
      paths: state.storage.paths,
      unlocked: map(state.auths.keystore, 'pubkey')
    },
    settings: state.settings,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsKeys));

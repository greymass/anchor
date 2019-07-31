// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { map } from 'lodash';

import ToolsWalletsComponent from '../../../../../shared/components/Tools/Wallets';

import * as WalletActions from '../../../../../shared/actions/wallet';
import * as WalletsActions from '../../../../../shared/actions/wallets';
import NavigationActions from '../../../actions/navigation';

class ToolsWallets extends Component<Props> {
  render = () => (
    <ToolsWalletsComponent
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
      unlocked: map(state.auths.keystore, 'pubkey')
    },
    settings: state.settings,
    status: state.status,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...WalletActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsWallets));

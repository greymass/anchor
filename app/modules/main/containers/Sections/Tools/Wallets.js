// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsWalletsComponent from '../../../../../shared/components/Tools/Wallets';

import * as WalletActions from '../../../../../shared/actions/wallet';
import * as WalletsActions from '../../../../../shared/actions/wallets';
import NavigationActions from '../../../actions/navigation';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsWallets extends Component<Props> {
  render = () => (
    <ToolsWalletsComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    blockchains: state.blockchains,
    connection: state.connection,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    status: state.status,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...WalletActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsWallets));

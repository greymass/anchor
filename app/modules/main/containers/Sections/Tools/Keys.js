// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsKeysComponent from '../../../../../shared/components/Tools/Keys';

import * as StorageActions from '../../../../../shared/actions/storage';
import * as WalletActions from '../../../../../shared/actions/wallet';
import * as WalletsActions from '../../../../../shared/actions/wallets';
import NavigationActions from '../../../actions/navigation';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsKeys extends Component<Props> {
  render = () => (
    <ToolsKeysComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    blockchains: state.blockchains,
    connection: state.connection,
    paths: state.storage.paths,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    wallets: state.wallets
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions,
      ...StorageActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsKeys));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsCrosschainTransferComponent from '../../../../../shared/components/Tools/Blockchains/BEOS/CrosschainTransfer';

import * as CrosschainWithdrawActions from '../../../../../shared/actions/blockchains/beos/withdraw';
import * as SettingsActions from '../../../../../shared/actions/settings';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';

class ToolsCrosschainTransfer extends Component<Props> {
  render = () => (
    <ToolsCrosschainTransferComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    balances: state.balances,
    blockchains: state.blockchains,
    blockExplorers: state.blockExplorers,
    connection: state.connection,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...CrosschainWithdrawActions,
      ...SettingsActions,
      ...SystemStateActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsCrosschainTransfer));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsCrosschainTransferComponent from '../../../../../shared/components/Tools/Blockchains/BEOS/CrosschainTransfer';

import * as CrosschainWithdrawActions from '../../../../../shared/actions/blockchains/beos/withdraw';
import * as SettingsActions from '../../../../../shared/actions/settings';
import * as SystemStateActions from '../../../../../shared/actions/system/systemstate';
import * as TransferActions from '../../../../../shared/actions/transfer';
import * as WalletActions from '../../../../../shared/actions/wallet';

import makeGetKeysUnlocked from '../../../../../shared/selectors/getKeysUnlocked';

class ToolsCrosschainTransfer extends Component<Props> {
  render = () => (
    <ToolsCrosschainTransferComponent
      {...this.props}
    />
  )
}

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    balances: state.balances,
    blockchains: state.blockchains,
    blockExplorers: state.blockExplorers,
    connection: state.connection,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  });
  return mapStateToProps;
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...CrosschainWithdrawActions,
      ...SettingsActions,
      ...SystemStateActions,
      ...TransferActions,
      ...WalletActions,
    }, dispatch)
  };
}

export default withRouter(connect(makeMapStateToProps, mapDispatchToProps)(ToolsCrosschainTransfer));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { map } from 'lodash';
import compose from 'lodash/fp/compose';

import WalletPanelLocked from '../../../components/Wallet/Panel/Locked';

import { unlockWallet } from '../../../actions/wallet';

class GlobalWalletUnlocked extends Component<Props> {
  render() {
    const {
      actions,
      settings,
      validate,
      unlocked,
      wallet,
    } = this.props;
    if (unlocked) {
      return this.props.children;
    }
    return (
      <WalletPanelLocked
        actions={actions}
        settings={settings}
        validate={validate}
        wallet={wallet}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate,
    unlocked: (
      // Display unlocked content if the keystore contains a matching public key
      map(state.auths.keystore, 'pubkey').includes(state.wallet.pubkey)
      // Display unlocked content if this is a watch or ledger wallet
      || ['watch', 'ledger'].includes(state.settings.walletMode)
    ),
    wallet: state.wallet,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      unlockWallet
    }, dispatch)
  };
}

export default compose(
  translate(['wallet']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalWalletUnlocked);

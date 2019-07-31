// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Dropdown } from 'semantic-ui-react';

import GlobalFragmentWallet from '../../../../components/Global/Fragment/Wallet';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalAccountDropdownSelect extends Component<Props> {
  state = { open: false }
  onClose = () => {
    this.setState({ open: false });
  }
  onOpen = () => {
    this.setState({ open: true });
  }
  onToggle = () => {
    this.setState({ open: !this.state.open });
  }
  render() {
    const {
      account,
      authorization,
      chainId,
      fluid,
      mode,
      onSelect,
      pubkey,
      style,
      t,
      wallets
    } = this.props;
    if (!wallets || wallets.length === 0) {
      return false;
    }
    const availableWallets = wallets
      .filter(w => (
        w.chainId === chainId
        && (w.account !== account || w.authorization !== authorization)
      ))
      .sort((a, b) => a.account > b.account ? 1 : -1);
    const trigger = (
      <GlobalFragmentWallet
        account={account}
        authorization={authorization}
        mode={mode}
        pubkey={pubkey}
      />
    );
    const options = availableWallets.map((wallet) => ({
      key: `${wallet.account}@${wallet.authorization}`,
      text: `${wallet.account}@${wallet.authorization}`,
      value: wallet,
      content: (
        <GlobalFragmentWallet
          account={wallet.account}
          authorization={wallet.authorization}
          mode={wallet.mode}
          pubkey={wallet.pubkey}
        />
      )
    }));
    return (
      <Dropdown
        fluid={fluid}
        onChange={onSelect}
        options={options}
        scrolling
        selection
        style={style || {}}
        trigger={trigger}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountDropdownSelect);

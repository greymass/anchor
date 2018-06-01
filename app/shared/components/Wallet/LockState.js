// @flow
import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

import WalletLockStateLocked from './LockState/Locked';

export default class WalletLockState extends Component<Props> {
  render() {
    const {
      actions,
      keys,
      validate,
      wallet
    } = this.props;
    const walletExists = !!(wallet.data);
    if (!walletExists) return '';
    const walletLocked = (!keys.key);
    return walletLocked ? (
      <WalletLockStateLocked
        actions={actions}
        keys={keys}
        validate={validate}
        wallet={wallet}
      />
    ) : (
      <Menu.Item
        color="yellow"
        key="lockstate"
        inverted="true"
        onClick={actions.lockWallet}
      >
        <Icon
          color="yellow"
          name="unlock"
        />
      </Menu.Item>

    );
  }
}

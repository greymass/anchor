// @flow
import React, { Component } from 'react';
import { Icon, Menu, Popup } from 'semantic-ui-react';

import WalletLockStateLocked from './LockState/Locked';

export default class WalletLockState extends Component<Props> {
  render() {
    const {
      actions,
      locked,
      pubkeys,
      validate,
      wallet
    } = this.props;
    const walletExists = !!((wallet.account && wallet.mode === 'hot') || pubkeys.unlocked.length);
    if (!walletExists) return '';
    return locked ? (
      <WalletLockStateLocked
        actions={actions}
        validate={validate}
        wallet={wallet}
      />
    ) : (
      <Popup
        content="This wallet (and potentially other wallets) is unlocked. Click this icon to lock all of your wallets."
        inverted
        trigger={(
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
        )}
      />
    );
  }
}

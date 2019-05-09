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
        content="The wallet is currently unlocked. Click this menu item to lock it."
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

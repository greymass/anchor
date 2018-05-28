// @flow
import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export default class WalletStatus extends Component<Props> {
  render() {
    const {
      keys,
      wallet
    } = this.props;
    const walletExists = (wallet.data);
    const walletLocked = (!keys.key);

    return (
      <Menu.Item
        color={(walletLocked) ? 'green' : 'yellow'}
        inverted
      >
        {(walletExists)
          ? (
            <span>
              <Icon
                color={(walletLocked) ? 'green' : 'yellow'}
                name={(walletLocked) ? 'lock' : 'unlock'}
              />
              {(walletLocked) ? 'Locked' : 'Unlocked'}
            </span>
          )
          : (
            <span>
              New Wallet
            </span>
          )
        }
      </Menu.Item>
    );
  }
}

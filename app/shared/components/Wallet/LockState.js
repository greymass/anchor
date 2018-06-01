// @flow
import React, { Component } from 'react';
import { Icon, Menu } from 'semantic-ui-react';

export default class WalletLockState extends Component<Props> {
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
        key="lockstate"
        inverted="true"
      >
        {(walletExists)
          ? (
            <span>
              <Icon
                color={(walletLocked) ? 'green' : 'yellow'}
                name={(walletLocked) ? 'lock' : 'unlock'}
              />
            </span>
          )
          : ''
        }
      </Menu.Item>
    );
  }
}

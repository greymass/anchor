// @flow
import React, { Component } from 'react';
import { Icon, Menu, Popup } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

import WalletLockStateLocked from './LockState/Locked';

class WalletLockState extends Component<Props> {
  render() {
    const {
      actions,
      locked,
      pubkeys,
      t,
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
        content={t('wallet_lock_state_popup')}
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

export default withTranslation('wallet')(WalletLockState)

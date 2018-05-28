// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import WalletPanelFormNode from './Form/Node';
import WalletPanelButtonUnlock from './Button/Unlock';

export default class WalletPanelLocked extends Component<Props> {
  render() {
    const {
      actions,
      settings,
      validate,
      wallet
    } = this.props;
    const {
      unlockWallet
    } = actions;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              <WalletPanelFormNode
                onChange={this.onChange}
                validate={validate}
                value={settings.node}
              />
              <WalletPanelButtonUnlock
                unlockWallet={unlockWallet}
                validate={validate}
                wallet={wallet}
              />
            </div>
          )
        }
      </I18n>
    );
  }
}

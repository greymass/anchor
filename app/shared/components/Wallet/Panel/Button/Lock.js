// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button } from 'semantic-ui-react';

export default class WalletPanelButtonLock extends Component<Props> {
  render() {
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Button
              color="purple"
              content={t('wallet_panel_wallet_lock')}
              fluid
              icon="lock"
              onClick={this.props.lockWallet}
            />
          )
        }
      </I18n>
    );
  }
}

// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Confirm } from 'semantic-ui-react';

export default class WalletPanelButtonLogout extends Component<Props> {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  confirmRemoveWallet = () => {
    this.setState({ open: false }, () => {
      this.props.removeWallet();
    });
  }

  render() {
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <span>
              <Button
                color="red"
                content={t('wallet_panel_wallet_remove')}
                fluid
                icon="trash"
                onClick={this.open}
              />
              <Confirm
                open={this.state.open}
                onCancel={this.close}
                onConfirm={this.confirmRemoveWallet}
              />
            </span>
          )
        }
      </I18n>
    );
  }
}

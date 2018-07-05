// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button } from 'semantic-ui-react';

import WalletModalUnlock from '../../Modal/Unlock';

export default class WalletPanelButtonUnlock extends Component<Props> {
  state = {
    password: '',
    open: false
  }

  onChange = (e, { value }) => this.setState({ password: value })

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  onSubmit = () => {
    const {
      unlockWallet
    } = this.props;
    const {
      password
    } = this.state;
    unlockWallet(password);
  }

  render() {
    const {
      settings,
      validate
    } = this.props;
    const {
      open
    } = this.state;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <WalletModalUnlock
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              onClose={this.onClose}
              onSubmit={this.onSubmit}
              open={open}
              settings={settings}
              trigger={(
                <Button
                  color="purple"
                  content={t('wallet_panel_wallet_unlock')}
                  fluid
                  icon="unlock"
                  onClick={this.onOpen}
                />
              )}
              validate={validate}
            />
          )
        }
      </I18n>
    );
  }
}

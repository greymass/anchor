// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Confirm } from 'semantic-ui-react';

export default class WalletPanelButtonResetApp extends Component<Props> {
  state = { open: false }

  open = () => this.setState({ open: true })
  close = () => this.setState({ open: false })

  confirmResetApp = () => {
    this.setState({ open: false }, () => {
      this.props.clearSettingsCache();
    });
  }

  render() {
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <span>
              <Button
                content={t('reset_application')}
                color="red"
                onClick={this.open}
                size="tiny"
              />
              <Confirm
                open={this.state.open}
                onCancel={this.close}
                onConfirm={this.confirmResetApp}
              />
            </span>
          )
        }
      </I18n>
    );
  }
}

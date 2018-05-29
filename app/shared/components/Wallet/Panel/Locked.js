// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Icon, Segment } from 'semantic-ui-react';

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
              <Segment
                color="grey"
                padded
                secondary
                stacked
              >
                <Header
                  icon
                  textAlign="center"
                >
                  <Icon
                    circular
                    inverted
                    color="grey"
                    name="lock"
                  />
                  {t('wallet_panel_locked')}
                  <Header.Subheader>
                    {t('wallet_panel_locked_subheader')}
                  </Header.Subheader>
                </Header>
                <WalletPanelButtonUnlock
                  unlockWallet={unlockWallet}
                  validate={validate}
                  wallet={wallet}
                />
              </Segment>
            </div>
          )
        }
      </I18n>
    );
  }
}

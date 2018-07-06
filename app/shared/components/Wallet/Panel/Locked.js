// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Dimmer, Header, Loader, Icon, Segment } from 'semantic-ui-react';

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
            <Dimmer.Dimmable
              as={Segment}
              blurring
              color="grey"
              dimmed={validate.WALLET_PASSWORD === 'PENDING'}
              loading={validate.WALLET_PASSWORD === 'PENDING'}
              padded
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
                settings={settings}
                unlockWallet={unlockWallet}
                validate={validate}
                wallet={wallet}
              />
            </Dimmer.Dimmable>
          )
        }
      </I18n>
    );
  }
}

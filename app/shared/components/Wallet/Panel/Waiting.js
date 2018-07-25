// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Dimmer, Divider, Header, Icon, Segment } from 'semantic-ui-react';

import WalletPanelButtonUnlock from './Button/Unlock';

class WalletPanelWaiting extends Component<Props> {
  render() {
    const {
      actions,
      settings,
      t,
      validate,
      wallet
    } = this.props;
    return (
      <Dimmer.Dimmable
        as={Segment}
        blurring
        color="grey"
        // dimmed={validate.WALLET_PASSWORD === 'PENDING'}
        // loading={validate.WALLET_PASSWORD === 'PENDING'}
        padded
        stacked
      >
        <Header
          icon
          textAlign="center"
        >
          <Icon
            inverted
            loading
            color="grey"
            name="sync"
          />
          <Divider hidden />
          <Header.Content>
            {t('wallet_panel_waiting_header')}
            <Header.Subheader>
              {t('wallet_panel_waiting_subheader')}
            </Header.Subheader>
          </Header.Content>
        </Header>
        <p>
          {t('wallet_panel_waiting_instructions')}
        </p>
      </Dimmer.Dimmable>
    );
  }
}

export default translate('wallet')(WalletPanelWaiting);

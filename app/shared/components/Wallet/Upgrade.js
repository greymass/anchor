// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Icon, Segment } from 'semantic-ui-react';

import GlobalButtonWalletUpgrade from '../../containers/Global/Button/Wallet/Upgrade';

class WalletUpgrade extends Component<Props> {
  render() {
    const {
      settings,
      t,
      wallet
    } = this.props;
    const {
      skipImport,
      walletTemp
    } = settings;
    const needsUpgrade = (!wallet.pubkey || !wallet.authorization);
    if (!needsUpgrade || walletTemp || skipImport) return false;
    return (
      <Segment attached stacked>
        <Header>
          <GlobalButtonWalletUpgrade
            floated="left"
            style={{ marginRight: '1em' }}
            useWallet
            wallet={wallet}
          />
          <Icon name="warning sign" />
          <Header.Content>
            {t('wallet_requires_upgrade_header', { account: wallet.account })}
            <Header.Subheader>
              {t('wallet_requires_upgrade_subheader')}
            </Header.Subheader>
          </Header.Content>
        </Header>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletUpgrade);

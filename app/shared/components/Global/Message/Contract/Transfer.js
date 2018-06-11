// @flow
import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import WalletMessageContractBase from './Base';

class WalletMessageContractTransfer extends Component<Props> {
  render() {
    const { data, t } = this.props;
    return (
      <WalletMessageContractBase>
        <Header>
          {t('system_transfer_title')}
        </Header>
        <p>{t('system_transfer_1', data)}</p>
        <List style={{ marginLeft: '2em' }}>
          <List.Item>{t('system_transfer_2', data)}</List.Item>
          <List.Item>{t('system_transfer_3', data)}</List.Item>
          <List.Item>{t('system_transfer_4', data)}</List.Item>
        </List>
        <p>{t('system_transfer_5', data)}</p>
        <p>{t('system_transfer_6', data)}</p>
      </WalletMessageContractBase>
    );
  }
}

export default translate('contracts')(WalletMessageContractTransfer);

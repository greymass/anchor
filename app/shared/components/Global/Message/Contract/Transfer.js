// @flow
import React, { Component } from 'react';
import { Header, List } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalMessageContract from './Base';

export class GlobalMessageContractTransfer extends Component<Props> {
  render() {
    const { data, t } = this.props;
    return (
      <GlobalMessageContract>
        <Header>
          <p>
            {t('system_transfer_title')}
          </p>
        </Header>
        <p>{t('system_transfer_1', data)}</p>
        <List style={{ marginLeft: '2em' }}>
          <List.Item><p>{t('system_transfer_2', data)}</p></List.Item>
          <List.Item><p>{t('system_transfer_3', data)}</p></List.Item>
          <List.Item><p>{t('system_transfer_4', data)}</p></List.Item>
        </List>
        <p>{t('system_transfer_5', data)}</p>
        <p>{t('system_transfer_6', data)}</p>
      </GlobalMessageContract>
    );
  }
}

export default translate('contracts')(GlobalMessageContractTransfer);

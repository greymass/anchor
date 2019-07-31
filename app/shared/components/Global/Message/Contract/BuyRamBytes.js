// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import WalletMessageContract from './Base';

export class GlobalMessageContractBuyRamBytes extends Component<Props> {
  render() {
    const { data, t } = this.props;
    return (
      <WalletMessageContract>
        <p>{t('system_buyrambytes_1', data)}</p>
        <p>{t('system_buyrambytes_two', data)}</p>
        <p>{t('system_buyrambytes_three', data)}</p>
      </WalletMessageContract>
    );
  }
}

export default translate('contracts')(GlobalMessageContractBuyRamBytes);

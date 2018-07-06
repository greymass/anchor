// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import WalletMessageContractBase from './Base';

class WalletMessageContractBuyRamBytes extends Component<Props> {
  render() {
    const { data, t } = this.props;
    return (
      <WalletMessageContractBase>
        <p>{t('system_buyrambytes_1', data)}</p>
        <p>{t('system_buyrambytes_2', data)}</p>
        <p>{t('system_buyrambytes_3', data)}</p>
      </WalletMessageContractBase>
    );
  }
}

export default translate('contracts')(WalletMessageContractBuyRamBytes);

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import WalletMessageContractBase from './Base';

class WalletMessageContractSellRamBytes extends Component<Props> {
  render() {
    const { data, t } = this.props;
    return (
      <WalletMessageContractBase>
        <p>{t('system_sellrambytes_1', data)}</p>
        <p>{t('system_sellrambytes_2', data)}</p>
      </WalletMessageContractBase>
    );
  }
}

export default translate('contracts')(WalletMessageContractSellRamBytes);

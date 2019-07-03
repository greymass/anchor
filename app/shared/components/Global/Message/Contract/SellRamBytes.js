// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalMessageContract from './Base';

export class GlobalMessageContractSellRamBytes extends Component<Props> {
  render() {
    const { data, t } = this.props;
    return (
      <GlobalMessageContract>
        <p>{t('system_sellrambytes_1', data)}</p>
        <p>{t('system_sellrambytes_2', data)}</p>
      </GlobalMessageContract>
    );
  }
}

export default translate('contracts')(GlobalMessageContractSellRamBytes);

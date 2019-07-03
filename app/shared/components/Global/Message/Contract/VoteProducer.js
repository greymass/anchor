// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalMessageContract from './Base';

export class GlobalMessageContractVoteProducer extends Component<Props> {
  render() {
    const { data, t } = this.props;
    return (
      <GlobalMessageContract>
        <p>{t('system_voteproducer_1', data)}</p>
        <p>{t('system_voteproducer_2', data)}</p>
        <p>{t('system_voteproducer_3', data)}</p>
        <p>{t('system_voteproducer_4', data)}</p>
        <p>{t('system_voteproducer_5', data)}</p>
      </GlobalMessageContract>
    );
  }
}

export default translate('contracts')(GlobalMessageContractVoteProducer);

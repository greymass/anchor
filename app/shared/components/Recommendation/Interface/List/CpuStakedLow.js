// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Message } from 'semantic-ui-react';

class RecommendationInterfaceListCpuStakedLow extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      account,
      t
    } = this.props;

    const cpuStaked = account.total_resources &&
      account.total_resources.net_weight &&
      Number(account.total_resources.cpu_weight.split(' ')[0]);

    const shouldDisplayWarning = cpuStaked < 1;

    return (shouldDisplayWarning)
      ? (
        <Message
          content={t('recommendations_warning_cpu_staked_low')}
          icon="warning"
          warning
        />
      ) : (
        <Message
          content={t('recommendations_success_cpu_staked_sufficient')}
          icon="thumbs up"
          success
        />
      );
  }
}

export default translate('recommendations')(RecommendationInterfaceListCpuStakedLow);

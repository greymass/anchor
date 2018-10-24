// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Message } from 'semantic-ui-react';

class RecommendationInterfaceListResourcesLow extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      account,
      t
    } = this.props;

    const netAmount = account.total_resources &&
      account.total_resources.net_weight &&
      Number(account.total_resources.net_weight.split(' ')[0]);

    const cpuAmount = account.total_resources &&
      account.total_resources.net_weight &&
      Number(account.total_resources.cpu_weight.split(' ')[0]);

    const shouldDisplay = netAmount < 1 || cpuAmount < 1;

    return (shouldDisplay)
      ? (
        <Message
          content={t('recommendations_warning_resources_low')}
          icon="warning"
          warning
        />
      ) : (
        <Message
          content={t('recommendations_success_resources_sufficient')}
          icon="thumbs up"
          success
        />
      );
  }
}

export default translate('recommendations')(RecommendationInterfaceListResourcesLow);

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Message } from 'semantic-ui-react';

class RecommendationInterfaceListBandwidthStakedLow extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      account,
      t
    } = this.props;

    const netStaked = account.total_resources &&
      account.total_resources.net_weight &&
      Number(account.total_resources.net_weight.split(' ')[0]);

    const shouldDisplayWarning = netStaked < 1;

    return (shouldDisplayWarning)
      ? (
        <Message
          content={t('recommendations_warning_net_staked_low')}
          icon="warning"
          warning
        />
      ) : (
        <Message
          content={t('recommendations_success_net_staked_sufficient')}
          icon="thumbs up"
          success
        />
      );
  }
}

export default translate('recommendations')(RecommendationInterfaceListBandwidthStakedLow);

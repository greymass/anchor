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

    const shouldDisplayWarning = account.net_limit &&
      Number(account.net_limit.available) < 10000;

    return (shouldDisplayWarning)
      ? (
        <Message
          content={t('recommendations_warning_net_available_low')}
          icon="warning"
          warning
        />
      ) : '';
  }
}

export default translate('recommendations')(RecommendationInterfaceListResourcesLow);

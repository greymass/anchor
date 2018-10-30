// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Message } from 'semantic-ui-react';

class RecommendationInterfaceCpuAvailableLow extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      account,
      t
    } = this.props;

    const shouldDisplayWarning = account.cpu_limit &&
      Number(account.cpu_limit.available) < 3000;

    return (shouldDisplayWarning)
      ? (
        <Message
          content={t('recommendations_warning_cpu_available_low')}
          icon="warning"
          warning
        />
      ) : '';
  }
}

export default translate('recommendations')(RecommendationInterfaceCpuAvailableLow);

// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';

import { Message } from 'semantic-ui-react';
import GlobalModalDangerLink from '../../../Global/Modal/DangerLink';

class RecommendationInterfaceCpuAvailableLow extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      account,
      settings,
      t
    } = this.props;

    const shouldDisplayWarning = account.cpu_limit &&
      Number(account.cpu_limit.available) < 3000;

    return (shouldDisplayWarning)
      ? (
        <Message
          icon="warning"
          warning
        >
          <p>
            {t('recommendations_warning_cpu_available_low')}
            &nbsp;-&nbsp;
            <GlobalModalDangerLink
              content={t('recommendations_warning_cpu_emergency_link')}
              link={`https://cpuemergency.com/?account=${settings.account}`}
              settings={settings}
            />
          </p>
        </Message>
      ) : '';
  }
}

export default withTranslation('recommendations')(RecommendationInterfaceCpuAvailableLow);

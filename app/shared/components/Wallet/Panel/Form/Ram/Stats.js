// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Segment, Progress, Responsive } from 'semantic-ui-react';

class WalletPanelFormStakeStats extends Component<Props> {
  render() {
    const {
      ramUsage,
      ramQuota,
      t
    } = this.props;

    const ramUsagePercentage = (ramUsage / ramQuota) * 100;

    const ramUsageString = (parseFloat(ramUsage) / 1024).toFixed(3);
    const ramQuotaString = (parseFloat(ramQuota) / 1024).toFixed(3);

    const ramUsageHeader = `${t('ram_stats_available_title_one')} ${ramUsageString} kbs ${t('ram_stats_available_title_two')} ${ramQuotaString} kbs ${t('ram_stats_available_title_three')}`;

    return (
      <Segment>
        <p>
          {ramUsageHeader}
        </p>
        <Progress
          color="teal"
          label={(
            <div className="label">
              {ramUsagePercentage.toFixed(2)}%
              <Responsive as="span" minWidth={800} />
            </div>
          )}
          percent={ramUsagePercentage}
          size="tiny"
          style={{ minWidth: 0 }}
        />
      </Segment>
    );
  }
}

export default translate('ram')(WalletPanelFormStakeStats);

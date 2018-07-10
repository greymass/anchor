// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Segment, Progress, Responsive } from 'semantic-ui-react';

import GlobalDataBytes from '../../../../Global/Data/Bytes';

class WalletPanelFormStakeStats extends Component<Props> {
  render() {
    const {
      ramUsage,
      ramQuota,
      t
    } = this.props;

    const ramUsagePercentage = (ramUsage / ramQuota) * 100;

    return (
      <Segment>
        <p>
          {t('ram_stats_available_title_one')}
          <GlobalDataBytes
            bytes={Number(ramUsage)}
          />
          {t('ram_stats_available_title_two')}
          <GlobalDataBytes
            bytes={Number(ramQuota)}
          />
          {t('ram_stats_available_title_three')}
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

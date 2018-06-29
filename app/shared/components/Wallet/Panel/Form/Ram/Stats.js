// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Header, Segment, Progress, Responsive } from 'semantic-ui-react';

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
        <Header
          content={t('wallet_status_resources_ram_available_title')}
          icon="database"
          size="small"
          subheader={t('wallet_status_resources_ram_available_desc')}
        />
        <Progress
          color="teal"
          label={(
            <div className="label">
              {ramUsagePercentage.toFixed}%
              {' '}
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

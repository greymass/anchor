
// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Grid, Header, Progress, Responsive, Segment } from 'semantic-ui-react';

class WalletStatusResources extends Component<Props> {
  render() {
    const {
      statsFetcher,
      t
    } = this.props;

    const {
      cpuUsage,
      netUsage,
      ramUsage
    } = statsFetcher.resourceUsage();

    return (
      <Segment stacked>
        <Header dividing size="small">
          {t('wallet_status_resources_title')}
        </Header>
        <Grid columns={3} divided>
          <Grid.Row>
            <Grid.Column>
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
                    {ramUsage}%
                    {' '}
                    <Responsive as="span" minWidth={800} />
                  </div>
                )}
                percent={ramUsage}
                size="tiny"
                style={{ minWidth: 0 }}
              />
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('wallet_status_resources_cpu_available_title')}
                icon="microchip"
                size="small"
                subheader={t('wallet_status_resources_cpu_available_desc')}
              />
              <Progress
                color="teal"
                label={(
                  <div className="label">
                    {cpuUsage}%
                    {' '}
                    <Responsive as="span" minWidth={800} />
                  </div>
                )}
                percent={cpuUsage}
                size="tiny"
                style={{ minWidth: 0 }}
              />
            </Grid.Column>
            <Grid.Column>
              <Header
                content={t('wallet_status_resources_net_available_title')}
                icon="cloud upload"
                size="small"
                subheader={t('wallet_status_resources_net_available_desc')}
              />
              <Progress
                color="teal"
                label={(
                  <div className="label">
                    {netUsage}%
                    {' '}
                    <Responsive as="span" minWidth={800} />
                  </div>
                )}
                percent={netUsage}
                size="tiny"
                style={{ minWidth: 0 }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusResources);

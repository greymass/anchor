
// @flow
import React, { Component } from 'react';
import { Grid, Header, Progress, Responsive, Segment } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

export default class WalletStatusResources extends Component<Props> {
  render() {
    const { accounts, settings } = this.props;
    const account = accounts[settings.account] || {};
    const {
      cpu_limit,
      net_limit,
      ram_quota,
      ram_usage
    } = account;
    let cpuUsage;
    if (cpu_limit) {
      const { max, used } = cpu_limit;
      cpuUsage = Math.max(0, (100 - parseFloat((used / max) * 100))).toFixed(3);
    }
    let netUsage;
    if (net_limit) {
      const { max, used } = net_limit;
      netUsage = Math.max(0, (100 - parseFloat((used / max) * 100))).toFixed(3);
    }
    let ramUsage;
    if (ram_quota && ram_usage) {
      ramUsage = Math.max(0, (100 - parseFloat((ram_usage / ram_quota) * 100))).toFixed(3);
    }
    return (
      <I18n ns="wallet">
        {
          (t) => (
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
                          <Responsive as="span" minWidth={800}>

                          </Responsive>
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
                          <Responsive as="span" minWidth={800}>

                          </Responsive>
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
                          <Responsive as="span" minWidth={800}>

                          </Responsive>
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
          )
        }
      </I18n>
    );
  }
}

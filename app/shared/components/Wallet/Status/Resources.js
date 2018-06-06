
// @flow
import React, { Component } from 'react';
import { Header, Progress, Responsive, Segment } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

export default class WalletStatusResources extends Component<Props> {
  render() {
    const { accounts, settings } = this.props;
    const account = accounts[settings.account] || {};
    const {
      cpu_limit,
      net_limit
    } = account;
    let cpuUsage;
    let netUsage;
    if (cpu_limit) {
      const { available, max, used } = cpu_limit;
      cpuUsage = (used / max) * 100;
    }
    if (net_limit) {
      const { available, max, used } = net_limit;
      netUsage = (used / max) * 100;
    }
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Segment vertical basic>
              <Header size="small">
                {t('wallet_status_resources_title')}
              </Header>
              <Segment.Group horizontal>
                <Segment>
                  <Header size="small">
                    {t('wallet_status_resources_cpu_available_title')}
                    <Header.Subheader>
                      {t('wallet_status_resources_cpu_available_desc')}
                    </Header.Subheader>
                  </Header>
                  <Progress
                    color="teal"
                    label={(
                      <div className="label">
                        {Math.max(0, (100 - parseFloat(cpuUsage))).toFixed(3)}%
                        {' '}
                        <Responsive as="span" minWidth={800}>

                        </Responsive>
                      </div>
                    )}
                    percent={Math.max(0, (100 - (parseFloat(cpuUsage * 100) / 100)))}
                    size="tiny"
                    style={{ minWidth: 0 }}
                  />
                </Segment>
                <Segment>
                  <Header size="small">
                    {t('wallet_status_resources_net_available_title')}
                    <Header.Subheader>
                      {t('wallet_status_resources_net_available_desc')}
                    </Header.Subheader>
                  </Header>
                  <Progress
                    color="teal"
                    label={(
                      <div className="label">
                        {Math.max(0, (100 - parseFloat(netUsage))).toFixed(3)}%
                        {' '}
                        <Responsive as="span" minWidth={800}>

                        </Responsive>
                      </div>
                    )}
                    percent={Math.max(0, (100 - (parseFloat(netUsage * 100) / 100)))}
                    size="tiny"
                    style={{ minWidth: 0 }}
                  />
                </Segment>
              </Segment.Group>
            </Segment>
          )
        }
      </I18n>
    );
  }
}

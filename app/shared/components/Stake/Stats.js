// @flow
import React, { Component } from 'react';
import { Header, Segment, Grid } from 'semantic-ui-react';
import ReactJson from 'react-json-view';
import { I18n } from 'react-i18next';

export default class WalletStatus extends Component<Props> {
  render() {
    const { account, settings, balance } = this.props;
    const server = settings.node;

    let element = `No account stake data loaded yet (connected to: ${server})...`;

    if (account && account.account_name) {
      const total_staked = (account.net_weight + account.cpu_weight)/10000;
      const net_weight = (account.net_weight)/10000;
      const cpu_weight = (account.cpu_weight)/10000;
      const amount_not_staked = balance - total_staked;

      element = (
        <I18n ns="stake">
          {
            (t) => (
              <div>
                <Grid>
                  <Grid.Row>
                    <h2>{t('staked_data')}</h2>
                  </Grid.Row>
                  <Grid.Row>
                    {t('total_staked')}: {total_staked}
                  </Grid.Row>
                  <Grid.Row>
                    {t('net_staked')}: {net_weight}
                  </Grid.Row>
                  <Grid.Row>
                    {t('cpu_staked')}: {cpu_weight}
                  </Grid.Row>
                  <Grid.Row>
                    {t('amount_not_staked')}: {amount_not_staked}
                  </Grid.Row>
                </Grid>
              </div>
            )
          }
        </I18n>
      );
    }
    return (
      <Segment basic>
        {element}
      </Segment>
    );
  }
}

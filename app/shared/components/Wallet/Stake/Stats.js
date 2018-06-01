// @flow
import React, { Component } from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

export default class WalletStatus extends Component<Props> {
  render() {
    const { account, settings, balance } = this.props;
    const server = settings.node;

    let element = `No account stake data loaded yet (connected to: ${server})...`;

    if (account.account_name) {
      const coins_staked_to_net = account.coins_staked_to_net;
      const coins_staked_to_cpu = account.coins_staked_to_cpu;
      const total_staked = coins_staked_to_net + coins_staked_to_cpu;
      const amount_not_staked = balance.EOS;

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
                    {t('total_staked')}: {total_staked.toPrecision(4)}
                  </Grid.Row>
                  <Grid.Row>
                    {t('net_staked')}: {coins_staked_to_net.toPrecision(4)}
                  </Grid.Row>
                  <Grid.Row>
                    {t('cpu_staked')}: {coins_staked_to_cpu.toPrecision(4)}
                  </Grid.Row>
                  <Grid.Row>
                    {t('amount_not_staked')}: {amount_not_staked.toPrecision(4)}
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

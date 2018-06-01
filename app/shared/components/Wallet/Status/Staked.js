// @flow
import React, { Component } from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

export default class WalletStatusStaked extends Component<Props> {
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
              <Segment vertical basic>
                <Header size="small">
                  {t('wallet_status_balances')}
                </Header>
                <Table
                  attached="bottom"
                  definition
                  unstackable
                >
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{t('total_staked')}</Table.Cell>
                      <Table.Cell>{total_staked.toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{t('net_staked')}</Table.Cell>
                      <Table.Cell>{coins_staked_to_net.toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{t('cpu_staked')}</Table.Cell>
                      <Table.Cell>{coins_staked_to_cpu.toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{t('amount_not_staked')}</Table.Cell>
                      <Table.Cell>{amount_not_staked.toFixed(4)}</Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
              </Segment>
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

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
      const coinsStakedToNet = account.coins_staked_to_net;
      const coinsStakedToCpu = account.coins_staked_to_cpu;
      const totalStaked = coinsStakedToNet + coinsStakedToCpu;
      const amountNotStaked = balance.EOS;

      element = (
        <I18n ns="stake">
          {
            (t) => (
              <Segment vertical basic>
                <Header size="small">
                  {t('staked_balances')}
                </Header>
                <Table
                  attached="bottom"
                  definition
                  unstackable
                >
                  <Table.Body>
                    <Table.Row>
                      <Table.Cell>{t('total_staked')}</Table.Cell>
                      <Table.Cell>{totalStaked.toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{t('net_staked')}</Table.Cell>
                      <Table.Cell>{coinsStakedToNet.toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{t('cpu_staked')}</Table.Cell>
                      <Table.Cell>{coinsStakedToCpu.toFixed(4)}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell>{t('amount_not_staked')}</Table.Cell>
                      <Table.Cell>{amountNotStaked.toFixed(4)}</Table.Cell>
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

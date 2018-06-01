// @flow
import React, { Component } from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

export default class WalletStatusStaked extends Component<Props> {
  render() {
    const { accounts, balances, settings } = this.props;
    const account = accounts[settings.account] || {};
    const balance = balances[settings.account] || {};
    const stakedToNet = parseFloat(account.coins_staked_to_net).toFixed(4);
    const stakedToCpu = parseFloat(account.coins_staked_to_cpu).toFixed(4);
    const totalStaked = parseFloat(stakedToNet + stakedToCpu).toFixed(4);
    const amountNotStaked = parseFloat(balance.EOS).toFixed(4);
    return (
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
                    <Table.Cell width={5}>{t('total_staked')}</Table.Cell>
                    <Table.Cell>{totalStaked} EOS</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{t('net_staked')}</Table.Cell>
                    <Table.Cell>{stakedToNet} EOS</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{t('cpu_staked')}</Table.Cell>
                    <Table.Cell>{stakedToCpu} EOS</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{t('amount_not_staked')}</Table.Cell>
                    <Table.Cell>{amountNotStaked} EOS</Table.Cell>
                  </Table.Row>
                </Table.Body>
              </Table>
            </Segment>
          )
        }
      </I18n>
    );
  }
}

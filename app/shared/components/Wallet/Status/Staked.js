// @flow
import React, { Component } from 'react';
import { Header, Segment, Table } from 'semantic-ui-react';
import { I18n } from 'react-i18next';

export default class WalletStatusStaked extends Component<Props> {
  render() {
    const { accounts, settings } = this.props;
    const account = accounts[settings.account] || {};
    const {
      cpu_weight,
      net_weight
    } = account.total_resources;
    const totalStaked = (parseFloat(cpu_weight) + parseFloat(net_weight)).toFixed(4);
    return (
      <I18n ns="stake">
        {
          (t) => (
            <Segment vertical basic>
              <Table
                attached="bottom"
                definition
                unstackable
              >
                <Table.Body>
                  <Table.Row>
                    <Table.Cell>{t('cpu_staked')}</Table.Cell>
                    <Table.Cell>{cpu_weight}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell>{t('net_staked')}</Table.Cell>
                    <Table.Cell>{net_weight}</Table.Cell>
                  </Table.Row>
                  <Table.Row>
                    <Table.Cell width={5}>{t('total_staked')}</Table.Cell>
                    <Table.Cell>{totalStaked} EOS</Table.Cell>
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

// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Header, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';

export default class WalletStatusBalances extends Component<Props> {
  render() {
    const {
      balances,
      settings
    } = this.props;
    const tokens = (balances && balances[settings.account]) ? balances[settings.account] : {};
    const rows = [];
    forEach(tokens, (amount, token) => {
      rows.push((
        <Table.Row key={token}>
          <Table.Cell width={5}>
            {token}
          </Table.Cell>
          <Table.Cell>
            {amount}
          </Table.Cell>
        </Table.Row>
      ));
    });
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Segment vertical basic loading={!tokens}>
              <Table
                attached="bottom"
                definition
                unstackable
              >
                <Table.Body>
                  {(rows.length === 0)
                    ? (
                      <Table.Row key="none">
                        <Table.Cell width={16}>
                          <Header size="small">
                            {t('wallet_status_balances_none')}
                          </Header>
                        </Table.Cell>
                      </Table.Row>
                    )
                    : false
                  }
                  {rows}
                </Table.Body>
              </Table>
            </Segment>
          )
        }
      </I18n>
    );
  }
}

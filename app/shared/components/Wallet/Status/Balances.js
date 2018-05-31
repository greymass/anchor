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
          <Table.Cell collapsing>
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
            <Segment basic loading={!tokens}>
              <Header size="small">
                {t('wallet_status_balances')}
              </Header>
              <Table
                attached="bottom"
                definition
              >
                <Table.Body>
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

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';

class WalletStatusBalances extends Component<Props> {
  render() {
    const {
      accounts,
      balances,
      settings,
      t
    } = this.props;
    const account = accounts[settings.account] || {};
    const {
      self_delegated_bandwidth
    } = account;
    const totalStaked = (parseFloat(self_delegated_bandwidth.cpu_weight) + parseFloat(self_delegated_bandwidth.net_weight));
    const tokens = (balances && balances[settings.account]) ? balances[settings.account] : {};
    const rows = [];
    forEach(tokens, (amount, token) => {
      rows.push((
        <Table.Row key={token}>
          <Table.Cell width={5}>
            {token}
          </Table.Cell>
          <Table.Cell>
            {amount.toFixed(4)}
            {(token === 'EOS')
              ? (
                <span style={{ marginLeft: '0.25em' }}>
                  (+{totalStaked.toFixed(4)} EOS {t('wallet_status_resources_staked')})
                </span>
              )
              : ''
            }
          </Table.Cell>
        </Table.Row>
      ));
    });
    return (
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
    );
  }
}

export default translate('wallet')(WalletStatusBalances);

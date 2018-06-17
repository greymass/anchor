// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';
import TimeAgo from 'react-timeago';

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
      self_delegated_bandwidth,
      refund_request
    } = account;
    const totalStaked = (parseFloat(self_delegated_bandwidth.cpu_weight) + parseFloat(self_delegated_bandwidth.net_weight));
    const tokens = (balances && balances[settings.account]) ? balances[settings.account] : { EOS: 0 };
    let refundDate = false;
    let totalBeingUnstaked = 0;
    if (refund_request) {
      totalBeingUnstaked = parseFloat(refund_request.net_amount) + parseFloat(refund_request.cpu_amount)
      refundDate = new Date(`${refund_request.request_time}z`);
      refundDate.setHours(refundDate.getHours() + 72);
    }
    const totalTokens = totalStaked + totalBeingUnstaked + ((tokens.EOS) ? tokens.EOS : 0);
    const rows = [
      (
        <Table.Row key="EOS">
          <Table.Cell width={2}>
            EOS
          </Table.Cell>
          <Table.Cell width={10}>
            <Table size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>{t('wallet_status_liquid')}</Table.Cell>
                  <Table.Cell>{(tokens.EOS) ? tokens.EOS.toFixed(4) : '0.0000'} EOS</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('wallet_status_resources_staked')}</Table.Cell>
                  <Table.Cell>{totalStaked.toFixed(4)} EOS </Table.Cell>
                </Table.Row>
                {(refund_request)
                  ? (
                    <Table.Row>
                      <Table.Cell>{t('wallet_status_resources_being_unstaked')} </Table.Cell>
                      <Table.Cell>{totalBeingUnstaked.toFixed(4)} EOS (<TimeAgo date={refundDate} />)</Table.Cell>
                    </Table.Row>
                  )
                  : false
                }
                <Table.Row>
                  <Table.Cell>{t('wallet_status_total_balance')}</Table.Cell>
                  <Table.Cell>{totalTokens.toFixed(4)} EOS</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Table.Cell>
        </Table.Row>
      )
    ];
    // Add rows for remaining tokens
    forEach(tokens, (amount, token) => {
      if (token === 'EOS') return;
      rows.push((
        <Table.Row key={token}>
          <Table.Cell width={5}>
            {token}
          </Table.Cell>
          <Table.Cell>
            {amount.toFixed(4)}
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
            {rows}
          </Table.Body>
        </Table>
      </Segment>
    );
  }
}

export default translate('wallet')(WalletStatusBalances);

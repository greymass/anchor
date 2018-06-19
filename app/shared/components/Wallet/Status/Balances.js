// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';
import TimeAgo from 'react-timeago';

import { StatsFetcher } from '../../../utils/StateFetcher'

class WalletStatusBalances extends Component<Props> {
  claimUnstaked = () => {
    const {
      actions,
      settings
    } = this.props;
    actions.claimUnstaked(settings.account);
  }
  render() {
    const {
      accounts,
      balances,
      settings,
      t
    } = this.props;

    const account = accounts[settings.account] || {};
    const balance = balances[settings.account] || {};

    const statsFetcher = new StatsFetcher(account);

    statsFetcher.fetchBalances(balance);

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
                      <Table.Cell>
                        {(claimable)
                          ? (
                            <Button
                              color="blue"
                              content={t('wallet_status_resources_claim_unstaked')}
                              floated="right"
                              onClick={this.claimUnstaked}
                              size="small"
                            />
                          )
                          : false
                        }
                        {totalBeingUnstaked.toFixed(4)} EOS (<TimeAgo date={refundDate} />)
                      </Table.Cell>
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

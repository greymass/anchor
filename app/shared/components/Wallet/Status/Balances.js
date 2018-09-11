// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Icon, Popup, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';
import TimeAgo from 'react-timeago';

import GlobalDataBytes from '../../Global/Data/Bytes';

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
      account,
      balances,
      settings,
      statsFetcher,
      t
    } = this.props;

    const {
      refundDate,
      tokens,
      totalBeingUnstaked,
      totalStaked,
      totalTokens
    } = statsFetcher.fetchAll();
    const contracts = balances.__contracts;
    const claimable = (new Date() > refundDate);
    const watchedTokens = (settings.customTokens) ? settings.customTokens.map((token) => token.split(':')[1]) : [];
    const rows = [
      (
        <Table.Row key={settings.blockchain.prefix}>
          <Table.Cell width={2}>
            <Header>
            {settings.blockchain.prefix}
              <Header.Subheader>
                eosio.token
              </Header.Subheader>
            </Header>
          </Table.Cell>
          <Table.Cell width={10}>
            <Table size="small">
              <Table.Body>
                <Table.Row>
                  <Table.Cell width={4}>{t('wallet_status_liquid')}</Table.Cell>
                  <Table.Cell>{(tokens[settings.blockchain.prefix]) ? tokens[settings.blockchain.prefix].toFixed(4) : '0.0000'} {settings.blockchain.prefix}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('wallet_status_resources_staked')}</Table.Cell>
                  <Table.Cell>{totalStaked.toFixed(4)} {settings.blockchain.prefix} </Table.Cell>
                </Table.Row>
                {(refundDate)
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
                        {totalBeingUnstaked.toFixed(4)} {settings.blockchain.prefix} (<TimeAgo date={refundDate} />)
                      </Table.Cell>
                    </Table.Row>
                  )
                  : false
                }
                <Table.Row>
                  <Table.Cell>{t('wallet_status_total_balance')}</Table.Cell>
                  <Table.Cell>{totalTokens.toFixed(4)} {settings.blockchain.prefix}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('wallet_status_ram_amount')}</Table.Cell>
                  <Table.Cell>
                    <GlobalDataBytes
                      bytes={account.ram_quota}
                    />

                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Table.Cell>
        </Table.Row>
      )
    ];
    // Add rows for remaining tokens
    forEach(tokens, (amount, token) => {
      if (token === settings.blockchain.prefix || watchedTokens.indexOf(token) === -1) return;
      let contract = 'unknown';
      let precision = {
        [token]: 4
      };
      if (contracts && contracts[token]) {
        ({ contract, precision } = contracts[token]);
      }
      rows.push((
        <Table.Row key={token}>
          <Table.Cell width={5}>
            <Header>
              {token}
              <Header.Subheader>
                {contract}
              </Header.Subheader>
            </Header>
          </Table.Cell>
          <Table.Cell>
            {amount.toFixed(precision[token])}
          </Table.Cell>
        </Table.Row>
      ));
    });
    return (
      <Segment vertical basic loading={!tokens}>
        <Header>
          <Popup
            content={(
              <Header size="small">
                <Icon name="info circle" />
                <Header.Content>
                  {t('wallet_status_add_custom_token_header')}
                  <Header.Subheader>
                    {t('wallet_status_add_custom_token_action_subheader')}
                  </Header.Subheader>
                </Header.Content>
              </Header>
            )}
            inverted
            trigger={(
              <Button
                color="blue"
                content={t('wallet_status_add_custom_token_action')}
                floated="right"
                size="small"
              />
            )}
          />
          {t('wallet_status_add_custom_token_header')}
          <Header.Subheader>
            {t('wallet_status_add_custom_token_subheader')}
          </Header.Subheader>
        </Header>
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

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Segment, Table } from 'semantic-ui-react';
import { forEach } from 'lodash';
import TimeAgo from 'react-timeago';

import GlobalModalSettingsCustomToken from '../../Global/Modal/Settings/CustomTokens';

class WalletStatusBalances extends Component<Props> {
  state = {
    addingToken: false
  }
  showCustomToken = () => this.setState({ addingToken: true });
  hideCustomToken = () => this.setState({ addingToken: false });
  claimUnstaked = () => {
    const {
      actions,
      settings
    } = this.props;
    actions.claimUnstaked(settings.account);
  }
  render() {
    const {
      actions,
      balances,
      globals,
      settings,
      statsFetcher,
      t
    } = this.props;

    const {
      addingToken
    } = this.state;

    const {
      refundDate,
      tokens,
      totalBeingUnstaked,
      totalStaked,
      totalTokens
    } = statsFetcher.fetchAll();
    const contracts = balances.__contracts;
    const claimable = (new Date() > refundDate);

    const rows = [
      (
        <Table.Row key="EOS">
          <Table.Cell width={2}>
            <Header>
              EOS
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
                  <Table.Cell>{(tokens.EOS) ? tokens.EOS.toFixed(4) : '0.0000'} EOS</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>{t('wallet_status_resources_staked')}</Table.Cell>
                  <Table.Cell>{totalStaked.toFixed(4)} EOS </Table.Cell>
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
            <Header>
              {token}
              <Header.Subheader>
                {contracts[token]}
              </Header.Subheader>
            </Header>
          </Table.Cell>
          <Table.Cell>
            {amount.toFixed(4)}
          </Table.Cell>
        </Table.Row>
      ));
    });
    return (
      <Segment vertical basic loading={!tokens}>
        <GlobalModalSettingsCustomToken
          actions={actions}
          globals={globals}
          onClose={this.hideCustomToken}
          open={addingToken}
          settings={settings}
        />
        <Header>
          <Button
            color="blue"
            content={t('wallet_status_add_custom_token_action')}
            floated="right"
            onClick={this.showCustomToken}
            size="small"
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

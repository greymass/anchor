// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Header, Divider, Icon, Segment, Message, Table } from 'semantic-ui-react';

import StatsFetcher from '../../../../../utils/StatsFetcher';

class WalletPanelFormStakeConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      account,
      accountName,
      balance,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      netOriginal,
      onBack,
      settings,
      t
    } = this.props;

    const cpuAmount = parseFloat(decimalCpuAmount);
    const netAmount = parseFloat(decimalNetAmount);

    const cpuDifference = cpuAmount - cpuOriginal;
    const netDifference = netAmount - netOriginal;

    const lessThanOneEosStaked = (decimalNetAmount < 1 || decimalCpuAmount < 1);

    const statsFetcher = new StatsFetcher(account, balance);

    const refundDate = statsFetcher.refundDate();

    const unstaking = (cpuDifference < 0 || netDifference < 0);

    const unstakingWhenAmountBeingUnstaked = refundDate && unstaking;

    return (accountName !== account.account_name)
      ? (
        <Segment padding="true" basic>
          <Header textAlign="center">
            <p>{t('stake_confirming_header_one')}</p>
          </Header>
          <Table size="small" celled>
            <Table.Body>
              <Table.Row>
                <Table.Cell width={8}>
                  {t('stake_account_name')}
                </Table.Cell>
                <Table.Cell width={8}>
                  {accountName}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={8}>
                  {t('stake_cpu_amount')}
                </Table.Cell>
                <Table.Cell width={8}>
                  {cpuAmount.toFixed(4)} EOS
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell width={8}>
                  {t('stake_net_amount')}
                </Table.Cell>
                <Table.Cell width={8}>
                  {netAmount.toFixed(4)} EOS
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <Divider />
          <Button
            onClick={onBack}
          >
            <Icon name="arrow left" /> {t('back')}
          </Button>
          <Button
            color="blue"
            floated="right"
            onClick={this.onConfirm}
          >
            <Icon name="check" /> {t('confirm_stake')}
          </Button>
        </Segment>
      ) : (
        <Segment padding="true" basic>
          {(unstaking) ? (
            <Header textAlign="center">
              {t('about_to_unstake_tokens')}
            </Header>
          ) : ''}
          <Segment.Group>
            {(netDifference > 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="green">
                    <Icon name="wifi" />{t('about_to_stake_to_net')} {netDifference.toFixed(4)} EOS
                  </font>
                  <Header.Subheader>
                    ({t('you_will_have')} {netAmount.toFixed(4)} {t('eos_in_net_after')})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(netDifference < 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="red">
                    <Icon name="wifi" />{t('about_to_unstake_from_net')} {(-netDifference).toFixed(4)} EOS
                  </font>
                  <Header.Subheader>
                    ({t('you_will_have')} {netAmount.toFixed(4)} {t('eos_in_net_after')})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(cpuDifference > 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="green">
                    <Icon name="microchip" />{t('about_to_stake_to_cpu')} <b>{cpuDifference.toFixed(4)} EOS</b>
                  </font>
                  <Header.Subheader>
                    ({t('you_will_have')} {cpuAmount.toFixed(4)} {t('eos_in_cpu_after')})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}

            {(cpuDifference < 0) ? (
              <Segment>
                <Header textAlign="center">
                  <font color="red">
                    <Icon name="microchip" />{t('about_to_unstake_from_cpu')} <b>{(-cpuDifference).toFixed(4)} EOS</b>
                  </font>
                  <Header.Subheader>
                    ({t('you_will_have')} {cpuAmount.toFixed(4)} {t('eos_in_cpu_after')})
                  </Header.Subheader>
                </Header>
              </Segment>
            ) : ''}
          </Segment.Group>

          {(lessThanOneEosStaked) ? (
            <Message warning="true">{t('will_have_less_than_one_eos_staked')}</Message>
          ) : ''}

          {(unstakingWhenAmountBeingUnstaked) ? (
            <Message
              icon="warning sign"
              warning="true"
            >
              {t('have_already_unstaked')} {statsFetcher.totalBeingUnstaked().toFixed(4)} EOS {t('unstaking_will_be_reset')}
            </Message>
          ) : ''}

          <Divider />
          <Button
            onClick={onBack}
          >
            <Icon name="arrow left" /> {t('back')}
          </Button>
          <Button
            color="blue"
            floated="right"
            onClick={this.onConfirm}
          >
            <Icon name="check" /> {t('confirm_stake')}
          </Button>
        </Segment>
      );
  }
}

export default translate('stake')(WalletPanelFormStakeConfirming);

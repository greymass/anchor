// @flow
import React, { Component } from 'react';
import { Button, Header, Divider, Icon, Segment, Message } from 'semantic-ui-react';

import StatsFetcher from '../../../../../utils/StatsFetcher';

export default class WalletPanelFormStakeConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      account,
      balance,
      decimalCpuAmount,
      cpuOriginal,
      decimalNetAmount,
      netOriginal,
      onBack,
      t
    } = this.props;

    const cpuAmount = parseFloat(decimalCpuAmount);
    const netAmount = parseFloat(decimalNetAmount);

    const cpuDifference = cpuAmount - cpuOriginal;
    const netDifference = netAmount - netOriginal;

    const lessThanOneEosStaked = (decimalNetAmount < 1 || decimalCpuAmount < 1);

    const statsFetcher = new StatsFetcher(account, balance);

    const refundDate = statsFetcher.refundDate();

    const unstakingWhenAmountBeingUnstaked = refundDate && (cpuDifference < 0 || netDifference < 0)

    return (
      <Segment padding="true" basic>
        <Header textAlign="center">
          {t('about_to_unstake')}
        </Header>
        <Segment.Group vertical>
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
          <Message warning="true">
            {t('have_already_unstaked')} {statsFetcher.totalBeingUnstaked()} EOS {t('unstaking_will_be_reset')}
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

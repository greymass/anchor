// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Divider, Icon, Segment, Message } from 'semantic-ui-react';

export default class WalletPanelFormStakeConfirming extends Component<Props> {
  onConfirm = () => {
    const {
      onConfirm
    } = this.props;

    onConfirm();
  }

  render() {
    const {
      decimalCpuAmount,
      cpuOriginal,
      decimalNetAmount,
      netOriginal,
      onClose,
      t
    } = this.props;

    const cpuAmount = parseFloat(decimalCpuAmount);
    const netAmount = parseFloat(decimalNetAmount);

    const cpuDifference = cpuAmount - cpuOriginal;
    const netDifference = netAmount - netOriginal;

    return (
      <Segment padding="true" basic>
        <Segment padding="true" size="large">
          {(netDifference > 0) ? (
            <p>
              {t('about_to_stake_to_net')} <b>{netDifference.toFixed(4)} EOS</b><br />
              ({t('you_will_have')} {netAmount.toFixed(4)} {t('eos_in_net_after')})
            </p>
          ) : ''}

          {(netDifference < 0) ? (
            <p>
              {t('about_to_unstake_from_net')} <b>{(-netDifference).toFixed(4)} EOS</b><br />
              ({t('you_will_have')} {netAmount.toFixed(4)} {t('eos_in_net_after')})
            </p>
          ) : ''}

          {(cpuDifference > 0) ? (
            <p>
              {t('about_to_stake_to_cpu')} <b>{cpuDifference.toFixed(4)} EOS</b><br />
              ({t('you_will_have')} {cpuAmount.toFixed(4)} {t('eos_in_cpu_after')})
            </p>
          ) : ''}

          {(cpuDifference < 0) ? (
            <p>
              {t('about_to_unstake_from_cpu')} <b>{(-cpuDifference).toFixed(4)} EOS</b><br />
              ({t('you_will_have')} {cpuAmount.toFixed(4)} {t('eos_in_cpu_after')})
            </p>
          ) : ''}

          {(decimalNetAmount < 1 || decimalCpuAmount < 1) ? (
            <Message warning>{t('will_have_less_than_one_eos_staked')}</Message>
          ) : ''}
        </Segment>
        <Divider />
        <Button
          onClick={onClose}
        >
          <Icon name="x" /> {t('cancel')}
        </Button>
        <Button
          content={t('confirm_stake')}
          color="blue"
          floated="right"
          onClick={this.onConfirm}
        />
      </Segment>
    );
  }
}

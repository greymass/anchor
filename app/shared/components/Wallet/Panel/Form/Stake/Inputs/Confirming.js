// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Divider, Icon, Segment, Message } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class WalletPanelFormStakeInputsConfirming extends Component<Props> {
  onConfirm = debounce(() => {
    const {
      account,
      actions,
      cleanUpStakeAmounts,
      cpuAmount,
      EOSbalance,
      netAmount
    } = this.props;

    const {
      realNetAmount,
      realCpuAmount
    } = cleanUpStakeAmounts(account, netAmount, cpuAmount);

    const { setStakeWithValidation } = actions;

    setStakeWithValidation(EOSbalance, account, realNetAmount, realCpuAmount);
  }, 300)

  render() {
    const {
      actions,
      cpuAmount,
      netAmount,
      cpuOriginal,
      netOriginal,
    } = this.props;

    const netDifference = netAmount - netOriginal;
    const cpuDifference = cpuAmount - cpuOriginal;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Segment padding='true' basic>
              <Segment padding='true' size="large">
                {(netDifference > 0) ? (
                  <p>{t('about_to_stake_to_net')} <b>{netDifference.toFixed(4)} EOS</b><br /> ({t('you_will_have')} {netAmount.toFixed(4)} {t('eos_in_net_after')})</p>
                ) : ''}

                {(netDifference < 0) ? (
                  <p>{t('about_to_unstake_from_net')} <b>{(-netDifference).toFixed(4)} EOS</b><br />  ({t('you_will_have')} {netAmount.toFixed(4)} {t('eos_in_net_after')})</p>
                ) : ''}

                {(cpuDifference > 0) ? (
                  <p>{t('about_to_stake_to_cpu')} <b>{cpuDifference.toFixed(4)} EOS</b><br /> ({t('you_will_have')} {cpuAmount.toFixed(4)} {t('eos_in_cpu_after')})</p>
                ) : ''}

                {(cpuDifference < 0) ? (
                  <p>{t('about_to_unstake_from_cpu')} <b>{(-cpuDifference).toFixed(4)} EOS</b><br /> ({t('you_will_have')} {cpuAmount.toFixed(4)} {t('eos_in_cpu_after')})</p>
                ) : ''}

                {(netAmount < 1 || cpuAmount < 1) ? (
                  <Message warning>{t('will_have_less_than_one_eos_staked')}</Message>
                ) : ''}
              </Segment>
              <Divider />
              <Button
                onClick={actions.clearValidationState}
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
          )
        }
      </I18n>
    );
  }
}

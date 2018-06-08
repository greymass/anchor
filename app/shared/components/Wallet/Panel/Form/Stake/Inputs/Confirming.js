// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Message } from 'semantic-ui-react';

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
            <div>
              <Message warning>
                {(netDifference > 0) ? (
                  <p>{`${t('about_to_stake_to_net')} ${netDifference} EOS`}</p>
                ) : ''}

                {(netDifference < 0) ? (
                  <p>{`${t('about_to_unstake_from_net')} ${-netDifference} EOS`}</p>
                ) : ''}

                {(cpuDifference > 0) ? (
                  <p>{`${t('about_to_stake_to_cpu')} ${cpuDifference} EOS`}</p>
                ) : ''}

                {(cpuDifference < 0) ? (
                  <p>{`${t('about_to_unstake_from_cpu')} ${-cpuDifference} EOS`}</p>
                ) : ''}

                <Button
                  onClick={this.onConfirm}
                  content={t('confirm_stake')}
                  color="yellow"
                />
              </Message>
            </div>
          )
        }
      </I18n>
    );
  }
}

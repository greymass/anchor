// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Input, Message, Segment } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

type Props = {
  actions: {},
  account: {},
  balance: {},
  validate: {},
  system: {}
};

export default class WalletPanelFormStake extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    });
  }, 300)

  onSubmit = debounce(() => {
    const {
      actions,
      account,
      balance
    } = this.props;

    const EOSbalance = balance.EOS;

    const {
      cpuAmount,
      netAmount
    } = this.state;

    const {
      realNetAmount,
      realCpuAmount
    } = this.cleanUpStakeAmounts(account, netAmount, cpuAmount);

    const { setStakeConfirmingWithValidation } = actions;

    setStakeConfirmingWithValidation(EOSbalance, account, realNetAmount, realCpuAmount);
  }, 300)

  onConfirm = debounce(() => {
    const {
      actions,
      account,
      balance
    } = this.props;

    const EOSbalance = balance.EOS;

    const {
      cpuAmount,
      netAmount
    } = this.state;

    const {
      realNetAmount,
      realCpuAmount
    } = this.cleanUpStakeAmounts(account, netAmount, cpuAmount);

    const { setStakeWithValidation } = actions;

    setStakeWithValidation(EOSbalance, account, realNetAmount, realCpuAmount);
  }, 300)

  cleanUpStakeAmounts(account, netAmount, cpuAmount) {
    const cleanedNetAmount = netAmount || account.coins_staked_to_net;

    const cleanedCpuAmount = cpuAmount || account.coins_staked_to_cpu;

    this.setState({
      netAmount: parseFloat(cleanedNetAmount),
      cpuAmount: parseFloat(cleanedCpuAmount)
    });

    return {
      realNetAmount: this.state.netAmount,
      realCpuAmount: this.state.cpuAmount
    };
  }

  render() {
    const {
      account,
      balance,
      validate,
      system
    } = this.props;

    const EOSbalance = balance.EOS;

    const currentNetAmount = (account.coins_staked_to_net);
    const currentCpuAmount = (account.coins_staked_to_cpu);
    const currentTotalStake = currentNetAmount + currentCpuAmount;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Segment basic>
              {(validate.STAKE === 'ERROR' || validate.STAKE === 'NULL')
                ? (
                  <div>
                    <Message warning>
                      <p>{`${t('amount_not_staked')}: ${(EOSbalance - currentNetAmount - currentCpuAmount).toFixed(4)} EOS`}</p>
                      <p>{`${t('net_staked')}: ${currentNetAmount.toFixed(4)} EOS`}</p>
                      <p>{`${t('cpu_staked')}: ${currentCpuAmount.toFixed(4)} EOS`}</p>
                    </Message>
                    <Form onSubmit={this.onSubmit}>
                      <Form.Field
                        control={Input}
                        fluid
                        label={t('update_staked_net_amount')}
                        name="netAmount"
                        onChange={this.onChange}
                      />
                      <Form.Field
                        control={Input}
                        fluid
                        label={t('update_staked_cpu_amount')}
                        name="cpuAmount"
                        onChange={this.onChange}
                      />
                      <Button
                        onClick={this.onSubmit}
                        content={t('update_staked_coins')}
                        color="green"
                      />
                    </Form>
                  </div>
                )
                : ''
              }
              {(validate.STAKE === 'FAILURE')
                ? (
                  <Message negative>
                    <p>{t(validate.STAKE_ERROR)}</p>
                  </Message>
                )
                : ''
              }
              {(system.DELEGATEBW === 'SUCCESS' || system.UNDELEGATEBW === 'SUCCESS')
                ? (
                  <Message positive>
                    {(system.DELEGATEBW === 'SUCCESS')
                      ? (
                        <p>{`${t('stake_success')} tx # ${system.DELEGATEBW_LAST_TRANSACTION.transaction_id}`}</p>
                      )
                      : ''
                    }
                    {(system.UNDELEGATEBW === 'SUCCESS')
                      ? (
                        <p>{`${t('unstake_success')} tx # ${system.UNDELEGATEBW_LAST_TRANSACTION.transaction_id}`}</p>
                      )
                      : ''
                    }
                  </Message>
                )
                : ''
              }
              {(system.DELEGATEBW === 'PENDING' || system.UNDELEGATEBW === 'PENDING')
                ? (
                  <h2>Loading...</h2>
                )
                : ''
              }
              {(validate.STAKE === 'CONFIRMING')
                ? (
                  <Message warning>
                    {((this.state.netAmount + this.state.cpuAmount) >= currentTotalStake)
                      ? (
                        <p>{`${t('about_to_stake')} ${((this.state.netAmount + this.state.cpuAmount) - currentTotalStake).toFixed(4)} EOS`}</p>
                      )
                      :
                      (
                        <p>{`${t('about_to_unstake')} ${(currentTotalStake - this.state.netAmount - this.state.cpuAmount).toFixed(4)} EOS`}</p>
                      )
                    }

                    <Button
                      onClick={this.onConfirm}
                      content={t('confirm_stake')}
                      color="yellow"
                    />
                  </Message>
                )
                : ''
              }
            </Segment>
          )
        }
      </I18n>
    );
  }
}

// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Input, Message, Segment } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

type Props = {
  actions: {},
  account: {},
  balance: {},
  settings: {},
  validate: {},
  system: {}
};

export default class WalletPanelFormStake extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    const {
      account
    } = this.props;

    this.state = {
      error: false
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      error: false,
      [name]: value,
    });
  }, 300)

  onSubmit = debounce(() => {
    const {
      actions,
      account,
      balance
    } = this.props;

    const EOSbalance = balance['EOS'];

    const {
      cpu_amount,
      net_amount
    } = this.state;

    const {real_net_amount, real_cpu_amount} = this.cleanUpStakeAmounts(account, net_amount, cpu_amount);

    const { setStakeConfirmingWithValidation } = actions;

    setStakeConfirmingWithValidation(EOSbalance, account, real_net_amount, real_cpu_amount);
  }, 300)

  onConfirm = debounce(() => {
    const {
      actions,
      account,
      balance
    } = this.props;

    const EOSbalance = balance['EOS'];

    const {
      cpu_amount,
      net_amount
    } = this.state;

    const {real_net_amount, real_cpu_amount} = this.cleanUpStakeAmounts(account, net_amount, cpu_amount);

    const { setStakeWithValidation } = actions;

    setStakeWithValidation(EOSbalance, account, real_net_amount, real_cpu_amount);
  }, 300)

  cleanUpStakeAmounts(account, net_amount, cpu_amount) {
    if (net_amount == undefined) {
      net_amount = account.coins_staked_to_net;
    }

    if (cpu_amount == undefined) {
      cpu_amount = account.coins_staked_to_cpu;
    }

    this.setState({
      net_amount: parseFloat(net_amount),
      cpu_amount: parseFloat(cpu_amount)
    })

    return {
      real_net_amount: this.state.net_amount,
      real_cpu_amount: this.state.cpu_amount
    };
  }

  render() {
    const {
      actions,
      account,
      balance,
      validate,
      system
    } = this.props;

    const EOSbalance = balance['EOS'];

    const current_net_amount = (account.coins_staked_to_net);
    const current_cpu_amount = (account.coins_staked_to_cpu);
    const current_total_stake = current_net_amount + current_cpu_amount;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Segment basic>

                {(validate.STAKE === 'ERROR' || validate.STAKE === 'NULL')
                  ? (
                    <div>
                      <Message warning>
                        <p>{`${t('amount_not_staked')}: ${(EOSbalance - current_net_amount - current_cpu_amount).toPrecision(4)} EOS`}</p>
                        <p>{`${t('net_staked')}: ${current_net_amount.toPrecision(4)} EOS`}</p>
                        <p>{`${t('cpu_staked')}: ${current_cpu_amount.toPrecision(4)} EOS`}</p>
                      </Message>
                      <Form onSubmit={this.onSubmit}>
                        <Form.Field
                          control={Input}
                          fluid
                          label={t('update_staked_net_amount')}
                          name="net_amount"
                          onChange={this.onChange}
                        />
                        <Form.Field
                          control={Input}
                          fluid
                          label={t('update_staked_cpu_amount')}
                          name="cpu_amount"
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
                          <p>{`${t('stake_success')} tx # ${system.DELEGATEBW_LAST_TRANSACTION}`}</p>
                        )
                        : ''
                      }
                      {(system.UNDELEGATEBW === 'SUCCESS')
                        ? (
                          <p>{`${t('unstake_success')} tx # ${system.UNDELEGATEBW_LAST_TRANSACTION}`}</p>
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
                      {((this.state.net_amount + this.state.cpu_amount) >= current_total_stake)
                        ? (
                          <p>{t('about_to_stake') +
                            ` ${(this.state.net_amount + this.state.cpu_amount - current_total_stake).toPrecision(4)} EOS`}</p>
                        )
                        :
                        (
                          <p>{t('about_to_unstake') +
                            ` ${(current_total_stake - this.state.net_amount - this.state.cpu_amount).toPrecision(4)} EOS`}</p>
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

// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Input, Message, Segment } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

export default class StakeForm extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      account
    } = this.props;

    this.state = {
      error: false,
      cpu_amount: '',
      net_amount: ''
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

    const {
      cpu_amount,
      net_amount
    } = this.state;

    const { setStakeConfirmingWithValidation } = actions;

    const {real_net_amount, real_cpu_amount} = this.cleanUpStakeAmounts(account, net_amount, cpu_amount);

    setStakeConfirmingWithValidation(balance, account, real_net_amount, real_cpu_amount);
  }, 300)

  onConfirm = debounce(() => {
    const {
      actions,
      account,
      balance
    } = this.props;

    const {
      cpu_amount,
      net_amount
    } = this.state;

    const { setStakeWithValidation } = actions;

    setStakeWithValidation(balance, account, net_amount, cpu_amount);
  }, 300)

  cleanUpStakeAmounts(account, net_amount, cpu_amount) {
    if (account.net_weight/10000) {
      net_amount = (account.net_weight/10000);
    }

    if (account.cpu_weight/10000) {
      cpu_amount = (account.cpu_weight/10000);
    }

    return {
      net_amount: net_amount,
      cpu_amount: cpu_amount
    };
  }

  render() {
    const {
      actions,
      account,
      balance,
      validate
    } = this.props;

    const current_net_amount = account && (account.net_weight/10000);
    const current_cpu_amount = account && (account.cpu_weight/10000);
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
                        <p>{`${t('amount_not_staked')}: ${balance - (current_net_amount + current_cpu_amount)} EOS`}</p>
                        <p>{`${t('net_staked')}: ${current_net_amount} EOS`}</p>
                        <p>{`${t('cpu_staked')}: ${current_cpu_amount} EOS`}</p>
                      </Message>
                      <Form onSubmit={this.onSubmit}>
                        <Form.Field
                          control={Input}
                          fluid
                          label={t('stake_net_amount')}
                          name="net_amount"
                          onChange={this.onChange}
                        />
                        <Form.Field
                          control={Input}
                          fluid
                          label={t('stake_cpu_amount')}
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
                {(validate.STAKE === 'SUCCESS')
                  ? (
                    <Message positive>
                      <p>{t('stake_updated')}</p>
                    </Message>
                  )
                  : ''
                }
                {(validate.STAKE === 'CONFIRMING')
                  ? (
                    <Message warning>
                      {((this.state.net_amount + this.state.cpu_amount) >= current_total_stake)
                        ? (
                          <p>{t('about_to_stake') +
                            ` ${(this.state.net_amount + this.state.cpu_amount) - current_total_stake} EOS`}</p>
                        )
                        :
                        (
                          <p>{t('about_to_unstake') +
                            ` ${current_total_stake - this.state.net_amount - this.state.cpu_amount} EOS`}</p>
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

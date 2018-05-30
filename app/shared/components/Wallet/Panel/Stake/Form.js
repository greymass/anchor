// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Input, Message, Segment, Modal } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

export default class StakeForm extends Component<Props> {
  constructor(props) {
    super(props);

    const {
      account
    } = this.props;

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

    const { setConfirmingStakeWithValidation } = actions;

    setConfirmingWithValidation(balance, account, net_amount, cpu_amount);
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

  render() {
    const {
      actions,
      validate,
      account
    } = this.props;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Segment basic>
              <Form onSubmit={this.onSubmit}>
                <Form.Field
                  control={Input}
                  fluid
                  label={t('stake_net_amount')}
                  loading={(validate.STAKE === 'PENDING')}
                  name="net_amount"
                  onChange={this.onChange}
                  defaultValue={account && (account.net_weight/10000)}
                />
                <Form.Field
                  control={Input}
                  fluid
                  label={t('stake_cpu_amount')}
                  loading={(validate.STAKE === 'PENDING')}
                  name="cpu_amount"
                  onChange={this.onChange}
                  defaultValue={account && (account.cpu_weight/10000)}
                />
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
                      <p>{t('about_to_stake') +  `${this.state.net_amount + this.state.cpu_amount} EOS`}</p>
                      <Button
                        onClick={this.onConfirm}
                        content={t('confirm_stake')}
                        color="yellow"
                      />
                    </Message>
                  )
                  : ''
                }
                <Button
                  onClick={this.onClick}
                  content={t('stake_coins')}
                  color="green"
                />
              </Form>
            </Segment>
          )
        }
      </I18n>
    );
  }
}

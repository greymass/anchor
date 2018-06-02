// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Divider, Header, Form, Input, Message, Segment } from 'semantic-ui-react';
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
    const { account } = props;
    this.state = {
      cpuAmount: account.coins_staked_to_cpu,
      cpuOriginal: account.coins_staked_to_cpu,
      netAmount: account.coins_staked_to_net,
      netOriginal: account.coins_staked_to_net
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: parseFloat(value),
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
      onClose,
      system,
      validate
    } = this.props;

    const {
      cpuAmount,
      cpuOriginal,
      netAmount,
      netOriginal
    } = this.state;

    const EOSbalance = balance.EOS;
    const currentTotalStake = netOriginal + cpuOriginal;
    console.log(system);
    return (
      <I18n ns="stake">
        {
          (t) => (
            <div>
              {(validate.STAKE === 'ERROR' || validate.STAKE === 'NULL')
                ? (
                  <div>
                    <Segment.Group horizontal>
                      <Segment>
                        <Header textAlign="center">
                          {(EOSbalance).toFixed(4)} EOS
                          <Header.Subheader>
                            {t('amount_not_staked')}
                          </Header.Subheader>
                        </Header>
                      </Segment>
                      <Segment>
                        <Header textAlign="center">
                          {cpuOriginal.toFixed(4)} EOS
                          <Header.Subheader>
                            {t('cpu_staked')}
                          </Header.Subheader>
                        </Header>
                      </Segment>
                      <Segment>
                        <Header textAlign="center">
                          {netOriginal.toFixed(4)} EOS
                          <Header.Subheader>
                            {t('net_staked')}
                          </Header.Subheader>
                        </Header>
                      </Segment>
                    </Segment.Group>
                    <Form>
                      <Form.Group widths='equal'>
                        <Form.Field
                          control={Input}
                          fluid
                          label={t('update_staked_cpu_amount')}
                          name="cpuAmount"
                          onChange={this.onChange}
                          defaultValue={cpuOriginal.toFixed(4)}
                        />
                        <Form.Field
                          control={Input}
                          fluid
                          label={t('update_staked_net_amount')}
                          name="netAmount"
                          onChange={this.onChange}
                          defaultValue={netOriginal.toFixed(4)}
                        />
                      </Form.Group>
                      <Divider />
                      <Message
                        icon="info circle"
                        info
                        content={t('undelegate_explanation')}
                      />
                      <Divider />
                      <Button
                        content={t('cancel')}
                        color="grey"
                        onClick={onClose}
                      />
                      <Button
                        content={t('update_staked_coins')}
                        color="green"
                        floated="right"
                        onClick={this.onConfirm}
                      />
                    </Form>
                  </div>
                )
                : ''
              }
              {(validate.STAKE === 'FAILURE' || system.DELEGATEBW === 'FAILURE' || system.UNDELEGATEBW === 'FAILURE')
                ? (
                  <Message negative>
                    <p>{t(validate.STAKE_ERROR)}</p>
                    <p>{system.UNDELEGATEBW_LAST_ERROR.message}</p>
                    <p>{system.UNDELEGATEBW_LAST_ERROR.message}</p>
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
                  <Segment>
                    <Header>
                      {((cpuAmount + netAmount) >= currentTotalStake)
                        ? (
                          <span>
                            {t('about_to_stake')}
                            {' '}
                            {((cpuAmount + netAmount) - currentTotalStake).toFixed(4)}
                            {' '}
                            EOS
                          </span>
                        )
                        : (
                          <span>
                            {t('about_to_unstake')}
                            {' '}
                            {(currentTotalStake - netAmount - cpuAmount).toFixed(4)}
                            {' '}
                            EOS
                          </span>
                        )
                      }
                    </Header>
                    <Button
                      onClick={this.onConfirm}
                      content={t('confirm_stake')}
                      color="yellow"
                      floated="right"
                    />
                  </Segment>
                )
                : ''
              }
            </div>
          )
        }
      </I18n>
    );
  }
}

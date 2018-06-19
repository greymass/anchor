// @flow
import React, { Component } from 'react';
import { Decimal } from 'decimal.js';
import { Segment, Form, Divider, Message, Button } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeInput from './Stake/Input';

import FormMessageTransactionSuccess from '../../../Global/Form/Message/TransactionSuccess';
import WalletPanelFormStakeConfirming from './Stake/Confirming';


import FormMessageError from '../../../Global/Form/Message/Error';

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
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth;

    const parsed_cpu_weight = cpu_weight.split(' ')[0];
    const parsed_net_weight = net_weight.split(' ')[0];

    this.state = {
      decimalCpuAmount: Decimal(parsed_cpu_weight),
      cpuOriginal: Decimal(parsed_cpu_weight),
      decimalNetAmount: Decimal(parsed_net_weight),
      netOriginal: Decimal(parsed_net_weight),
      confirming: false,
      formError: null,
      submitDisabled: true
    };
  }

  onSubmit = (e) => {
    if (!this.state.submitDisabled) {
      this.setState({
        confirming: true
      });
    }
    e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit(e);

      e.preventDefault();
      return false;
    }
  }

  onError = (error) => {
    let errorMessage;

    if (error !== true) {
      errorMessage = error;
    }

    this.setState({
      submitDisabled: true,
      formError: errorMessage
    });
  }

  onChange = (name, value) => {
    const decimalFieldName = `decimal${name.charAt(0).toUpperCase()}${name.slice(1)}`;

    this.setState({
      submitDisabled: false,
      formError: null,
      [decimalFieldName]: Decimal(value)
    });
  }

  onBack = () => {
    this.setState({
      confirming: false
    });
  }

  onConfirm = () => {
    const {
      account,
      actions
    } = this.props;

    const {
      decimalCpuAmount,
      decimalNetAmount
    } = this.state;

    const {
      setStake
    } = actions;

    this.setState({
      confirming: false
    });

    setStake(account, decimalNetAmount, decimalCpuAmount);
  }

  render() {
    const {
      account,
      actions,
      balance,
      onClose,
      system,
      validate,
      t
    } = this.props;

    const {
      decimalCpuAmount,
      cpuOriginal,
      decimalNetAmount,
      netOriginal,
      submitDisabled
    } = this.state;

    const EOSbalance = balance.EOS || 0;

    const lastTransactions = [];

    if (
      system.DELEGATEBW_LAST_TRANSACTION
      && system.DELEGATEBW_LAST_TRANSACTION.transaction_id
    ) {
      lastTransactions.push(system.DELEGATEBW_LAST_TRANSACTION);
    }

    if (
      system.UNDELEGATEBW_LAST_TRANSACTION
      && system.UNDELEGATEBW_LAST_TRANSACTION.transaction_id
    ) {
      lastTransactions.push(system.UNDELEGATEBW_LAST_TRANSACTION);
    }

    const shouldShowConfirm = this.state.confirming;
    const shouldShowSuccess = (system.DELEGATEBW === 'SUCCESS' || system.UNDELEGATEBW === 'SUCCESS') && !shouldShowConfirm;
    const shouldShowError = (system.DELEGATEBW === 'FAILURE' || system.UNDELEGATEBW === 'FAILURE') && !shouldShowConfirm;
    const shouldShowForm = (validate.STAKE === 'NULL') && !shouldShowSuccess && !shouldShowError && !shouldShowConfirm;

    return (
      <Segment
        loading={system.DELEGATEBW === 'PENDING' ||
                 system.UNDELEGATEBW === 'PENDING'}
        style={{ minHeight: '100px' }}
      >
        {(shouldShowSuccess)
          ? (
            <FormMessageTransactionSuccess
              onClose={onClose}
              transactions={lastTransactions}
            />
          )
          : ''}

        {(shouldShowForm)
          ? (
            <div>
              <WalletPanelFormStakeStats
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netOriginal={netOriginal}
                t={t}
              />
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <Form.Group widths="equal">
                  <WalletPanelFormStakeInput
                    cpuOriginal={cpuOriginal}
                    decimalCpuAmount={decimalCpuAmount}
                    decimalNetAmount={decimalNetAmount}
                    defaultValue={decimalCpuAmount}
                    EOSbalance={EOSbalance}
                    label={t('update_staked_cpu_amount')}
                    name='cpuAmount'
                    netOriginal={netOriginal}
                    onChange={this.onChange}
                    onError={this.onError}
                  />
                  <WalletPanelFormStakeInput
                    cpuOriginal={cpuOriginal}
                    decimalCpuAmount={decimalCpuAmount}
                    decimalNetAmount={decimalNetAmount}
                    defaultValue={decimalNetAmount}
                    EOSbalance={EOSbalance}
                    label={t('update_staked_net_amount')}
                    name='netAmount'
                    netOriginal={netOriginal}
                    onChange={this.onChange}
                    onError={this.onError}
                  />
                </Form.Group>
                <FormMessageError
                  error={this.state.formError}
                />
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
                  disabled={submitDisabled}
                  floated="right"
                  primary
                />
              </Form>
            </div>
          ) : ''}

        {(shouldShowError)
          ? (
            <FormMessageError
              error={system.DELEGATEBW_LAST_ERROR ||
                     system.UNDELEGATEBW_LAST_ERROR}
              onClose={onClose}
            />
          ) : ''}
        {(shouldShowConfirm)
          ? (
            <WalletPanelFormStakeConfirming
              account={account}
              actions={actions}
              decimalCpuAmount={decimalCpuAmount}
              cpuOriginal={cpuOriginal}
              EOSbalance={EOSbalance}
              decimalNetAmount={decimalNetAmount}
              netOriginal={netOriginal}
              onBack={this.onBack}
              onClose={onClose}
              onConfirm={this.onConfirm}
              validate={validate}
              t={t}
            />
          ) : ''}
      </Segment>
    );
  }
}

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeInput from './Stake/Input';
import WalletPanelFormStakeConfirming from './Stake/Confirming';
import FormMessageError from '../../../Global/Form/Message/Error';

type Props = {
  actions: {},
  account: {},
  balance: {},
  system: {}
};

class WalletPanelFormStake extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { account, settings } = props;
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth;

    const parsedCpuWeight = cpu_weight.split(' ')[0];
    const parsedNetWeight = net_weight.split(' ')[0];

    this.state = {
      EOSbalance: (props.balance && props.balance[settings.blockchain.prefix]) 
        ? props.balance[settings.blockchain.prefix] : 0,
      decimalCpuAmount: Decimal(parsedCpuWeight),
      cpuOriginal: Decimal(parsedCpuWeight),
      decimalNetAmount: Decimal(parsedNetWeight),
      netOriginal: Decimal(parsedNetWeight),
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
    }, () => {
      const error = this.errorsInForm();
      if (error) {
        this.onError(error);
      }
    });
  }

  errorsInForm = () => {
    const {
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      EOSbalance,
      netOriginal
    } = this.state;

    let cpuAmount = decimalCpuAmount;
    let netAmount = decimalNetAmount;

    const decimalRegex = /^\d+(\.\d{1,4})?$/;

    if (!decimalRegex.test(cpuAmount) || !decimalRegex.test(netAmount)) {
      return 'not_valid_stake_amount';
    }

    cpuAmount = Decimal(cpuAmount);
    netAmount = Decimal(netAmount);

    if (cpuOriginal.equals(cpuAmount) && netOriginal.equals(netAmount)) {
      return true;
    }

    if (!cpuAmount.greaterThan(0) || !netAmount.greaterThan(0)) {
      return 'no_stake_left';
    }

    const cpuChange = cpuAmount.minus(cpuOriginal);
    const netChange = netAmount.minus(netOriginal);

    if (Decimal.max(0, cpuChange).plus(Decimal.max(0, netChange)).greaterThan(EOSbalance)) {
      return 'not_enough_balance';
    }

    return false;
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
      balance,
      onClose,
      settings,
      system,
      t,
      connection
    } = this.props;

    const {
      decimalCpuAmount,
      cpuOriginal,
      decimalNetAmount,
      netOriginal,
      submitDisabled
    } = this.state;

    const EOSbalance = balance[settings.blockchain.prefix] || 0;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    return (
      <Segment
        loading={system.STAKE === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              <WalletPanelFormStakeStats
                connection={connection}
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netOriginal={netOriginal}
                settings={settings}
              />
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <Form.Group widths="equal">
                  <WalletPanelFormStakeInput
                    defaultValue={decimalCpuAmount}
                    icon="microchip"
                    label={t('update_staked_cpu_amount', {tokenSymbol:settings.blockchain.prefix})}
                    name="cpuAmount"
                    onChange={this.onChange}
                    onError={this.onError}
                    connection={connection}
                    settings={settings}
                  />
                  <WalletPanelFormStakeInput
                    defaultValue={decimalNetAmount}
                    icon="wifi"
                    label={t('update_staked_net_amount', {tokenSymbol:settings.blockchain.prefix})}
                    name="netAmount"
                    onChange={this.onChange}
                    onError={this.onError}
                    connection={connection}
                    settings={settings}
                  />
                </Form.Group>
                <FormMessageError
                  error={this.state.formError}
                />
                <Divider />
                <Message
                  icon="info circle"
                  info
                  content={t('undelegate_explanation', {tokenSymbol:settings.blockchain.prefix})}
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

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormStakeConfirming
              account={account}
              balance={balance}
              decimalCpuAmount={decimalCpuAmount}
              cpuOriginal={cpuOriginal}
              EOSbalance={EOSbalance}
              decimalNetAmount={decimalNetAmount}
              netOriginal={netOriginal}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              connection={connection}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('stake')(WalletPanelFormStake);

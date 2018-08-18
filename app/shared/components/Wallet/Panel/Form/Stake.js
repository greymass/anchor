// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button, Header } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeInput from './Stake/Input';
import WalletPanelFormStakeConfirming from './Stake/Confirming';
import FormMessageError from '../../../Global/Form/Message/Error';

import GlobalFormFieldAccount from '../../../Global/Form/Field/Account';

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
    const { account } = props;
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth;

    const parsedCpuWeight = cpu_weight.split(' ')[0];
    const parsedNetWeight = net_weight.split(' ')[0];

    this.state = {
      accountName: account.account_name,
      accountNameValid: true,
      EOSbalance: (props.balance && props.balance.EOS) ? props.balance.EOS : 0,
      decimalCpuAmount: Decimal(parsedCpuWeight),
      cpuOriginal: Decimal(parsedCpuWeight),
      decimalNetAmount: Decimal(parsedNetWeight),
      netOriginal: Decimal(parsedNetWeight),
      confirming: false,
      formError: null,
      submitDisabled: true
    };
  }

  componentWillMount() {
    const {
      accountName,
      confirming,
      cpuAmount,
      cpuOriginal,
      netAmount,
      netOriginal
    } = this.props;

    this.setState({
      accountName: accountName || '',
      confirming,
      cpuOriginal: cpuOriginal || cpuAmount || Decimal(0),
      decimalCpuAmount: cpuAmount || Decimal(0),
      decimalNetAmount: netAmount || Decimal(0),
      netOriginal: netOriginal || netAmount || Decimal(0)
    });
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

  onChange = (name, value, valid) => {
    const newState = {
      [name]: value,
      formError: null,
      submitDisabled: false
    };
    if (name === 'accountName') {
      newState.accountNameValid = valid;
    } else {
      const decimalFieldName = `decimal${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      newState[decimalFieldName] = Decimal(value);
    }

    this.setState(newState, () => {
      const error = this.errorsInForm();
      if (error) {
        this.onError(error);
      }
    });
  }

  errorsInForm = () => {
    const {
      account
    } = this.props;

    const {
      accountName,
      accountNameValid,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      EOSbalance,
      netOriginal
    } = this.state;

    if (!accountNameValid) {
      return 'not_valid_account_name';
    }

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

    if (account.account_name === accountName && (!cpuAmount.greaterThan(0) || !netAmount.greaterThan(0))) {
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
      actions
    } = this.props;

    const {
      accountName,
      decimalCpuAmount,
      decimalNetAmount
    } = this.state;

    const {
      setStake
    } = actions;

    this.setState({
      confirming: false
    });

    setStake(accountName, decimalNetAmount, decimalCpuAmount);
  }

  render() {
    const {
      account,
      balance,
      onClose,
      system,
      settings,
      t
    } = this.props;

    const {
      accountName,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      netOriginal,
      submitDisabled
    } = this.state;

    const EOSbalance = balance.EOS || 0;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    return (
      <Segment
        loading={system.STAKE === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              {(this.props.accountName && this.props.accountName !== account.account_name)
                ?
                (
                  <Header>
                    {t('update_stake_for_other_header')}
                    <u>{this.props.accountName}</u>
                  </Header>
                ) : ''}
              <WalletPanelFormStakeStats
                cpuOriginal={cpuOriginal}
                EOSbalance={EOSbalance}
                netOriginal={netOriginal}
              />
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                {(!this.props.accountName)
                  ? (
                    <Form.Group widths="equal">
                      <GlobalFormFieldAccount
                        value={accountName}
                        label={t('update_staked_account_name')}
                        name="accountName"
                        onChange={(e, { name, value, valid }) => this.onChange(name, value, valid)}
                        onError={this.onError}
                      />
                    </Form.Group>
                  ) : ''}
                <Form.Group widths="equal">
                  <WalletPanelFormStakeInput
                    defaultValue={decimalCpuAmount}
                    icon="microchip"
                    label={t('update_staked_cpu_amount')}
                    name="cpuAmount"
                    onChange={this.onChange}
                    onError={this.onError}
                  />
                  <WalletPanelFormStakeInput
                    defaultValue={decimalNetAmount}
                    icon="wifi"
                    label={t('update_staked_net_amount')}
                    name="netAmount"
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

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormStakeConfirming
              account={account}
              accountName={accountName}
              balance={balance}
              decimalCpuAmount={decimalCpuAmount}
              cpuOriginal={cpuOriginal}
              EOSbalance={EOSbalance}
              decimalNetAmount={decimalNetAmount}
              netOriginal={netOriginal}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('stake')(WalletPanelFormStake);

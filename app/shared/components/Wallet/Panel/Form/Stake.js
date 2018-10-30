// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button, Header } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeConfirming from './Stake/Confirming';
import FormMessageError from '../../../Global/Form/Message/Error';

import GlobalFormFieldAccount from '../../../Global/Form/Field/Account';
import GlobalFormFieldToken from '../../../Global/Form/Field/Token';

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
    let { account, settings } = props;
    if (!account) account = {};
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth || {
      cpu_weight: '0.0000 ' + settings.blockchain.tokenSymbol,
      net_weight: '0.0000 ' + settings.blockchain.tokenSymbol
    };

    const parsedCpuWeight = cpu_weight.split(' ')[0];
    const parsedNetWeight = net_weight.split(' ')[0];

    this.state = {
      accountName: account.account_name,
      accountNameValid: true,
      confirming: false,
      cpuAmountValid: true,
      cpuOriginal: Decimal(parsedCpuWeight),
      decimalCpuAmount: Decimal(parsedCpuWeight),
      decimalNetAmount: Decimal(parsedNetWeight),
      EOSbalance: (props.balance && props.balance[settings.blockchain.tokenSymbol]) 
        ? props.balance[settings.blockchain.tokenSymbol] : 0,
      formError: null,
      netAmountValid: true,
      netOriginal: Decimal(parsedNetWeight),
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

  onChange = (e, { name, value, valid }) => {
    const {
      actions
    } = this.props;

    const {
      checkAccountExists
    } = actions;

    const newState = {
      [name]: value,
      formError: null,
      submitDisabled: false
    };

    if (name === 'accountName') {
      checkAccountExists(value);
    } else {
      const decimalFieldName = `decimal${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      newState[decimalFieldName] = Decimal(value.split(' ')[0]);
    }

    newState[`${name}Valid`] = valid;

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
      cpuAmountValid,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      EOSbalance,
      netAmountValid,
      netOriginal
    } = this.state;

    if (!accountNameValid) {
      return 'not_valid_account_name';
    }

    if (!cpuAmountValid || !netAmountValid) {
      return 'not_valid_stake_amount';
    }

    if (!accountNameValid) {
      return 'not_valid_account_name';
    }

    if (cpuOriginal.equals(decimalCpuAmount) && netOriginal.equals(decimalNetAmount)) {
      return true;
    }

    const cpuDifference = cpuOriginal.minus(decimalCpuAmount);
    const netDifference = netOriginal.minus(decimalNetAmount);
    const cpuWeightDecimal = Decimal(account.cpu_weight / 10000);
    const netWeightDecimal = Decimal(account.net_weight / 10000);

    if (account.account_name === accountName &&
      (cpuWeightDecimal.equals(cpuDifference) || netWeightDecimal.equals(netDifference))) {
      return 'no_stake_left';
    }

    const cpuChange = decimalCpuAmount.minus(cpuOriginal);
    const netChange = decimalNetAmount.minus(netOriginal);

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

    const EOSbalance = balance[settings.blockchain.tokenSymbol] || 0;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    let {
      formError
    } = this.state;

    if (system.ACCOUNT_EXISTS === 'FAILURE' &&
        system.ACCOUNT_EXISTS_LAST_ACCOUNT === accountName) {
      formError = formError || 'account_does_not_exist';
    }

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
                {(!this.props.accountName)
                  ? (
                    <Form.Group widths="equal">
                      <GlobalFormFieldAccount
                        value={accountName}
                        label={t('update_staked_account_name')}
                        name="accountName"
                        onChange={this.onChange}
                      />
                    </Form.Group>
                  ) : ''}
                <Form.Group widths="equal">
                  <GlobalFormFieldToken
                    autoFocus
                    icon="microchip"
                    label={t('update_staked_cpu_amount', {tokenSymbol:settings.blockchain.tokenSymbol})}
                    name="cpuAmount"
                    onChange={this.onChange}
                    defaultValue={decimalCpuAmount.toFixed(4)}
                    connection={connection}
                    settings={settings}
                  />

                  <GlobalFormFieldToken
                    autoFocus
                    icon="wifi"
                    label={t('update_staked_net_amount', {tokenSymbol:settings.blockchain.tokenSymbol})}
                    name="netAmount"
                    onChange={this.onChange}
                    defaultValue={decimalNetAmount.toFixed(4)}
                    connection={connection}
                    settings={settings}
                  />
                </Form.Group>
                <FormMessageError
                  error={formError}
                />
                <Divider />
                <Message
                  icon="info circle"
                  info
                  content={t('undelegate_explanation', {tokenSymbol:settings.blockchain.tokenSymbol})}
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
              connection={connection}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('stake')(WalletPanelFormStake);

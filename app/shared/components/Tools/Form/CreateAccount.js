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

class ToolsFormCreateAccount extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    const {
      balance
    } = props;

    this.state = {
      EOSbalance: (balance && balance.EOS) ? balance.EOS : 0,
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
    this.setState({
      submitDisabled: false,
      formError: null,
      [name]: value
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
      system,
      t
    } = this.props;

    const {
      accountName,
      publicKey,
      ramAmount,
      startingBalance,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    return (
      <Segment
        loading={system.STAKE === 'PENDING'}
        style={{ minHeight: '100px' }}
      >
        {(shouldShowForm)
          ? (
            <div>
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <Form.Group widths="equal">
                  <GlobalFormFieldAccountName
                    defaultValue={accountName}
                    label={t('tools_form_create_account_account_name')}
                    name="cpuAmount"
                    onChange={this.onChange}
                    onError={this.onError}
                  />
                  <GlobalFormFieldKeyPublic
                    defaultValue={publicKey}
                    label={t('tools_form_create_account_public_key')}
                    name="netAmount"
                    onChange={this.onChange}
                    onError={this.onError}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <GlobalFormFieldRam
                    defaultValue={ramAmount}
                    label={t('tools_form_create_account_ram_amount')}
                    name="cpuAmount"
                    onChange={this.onChange}
                    onError={this.onError}
                  />
                  <GlobalFormFieldBalance
                    defaultValue={startingBalance}
                    label={t('tools_form_create_account_starting_balance')}
                    name="netAmount"
                    onChange={this.onChange}
                    onError={this.onError}
                  />
                </Form.Group>
                <FormMessageError
                  error={this.state.formError}
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
            <ToolsFormCreateAccountConfirming
              account={account}
              balance={balance}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('stake')(ToolsFormCreateAccount);

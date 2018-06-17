// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import { Form, Divider, Message, Button, Input } from 'semantic-ui-react';

import WalletPanelFormStakeInputsConfirming from './Inputs/Confirming';

import debounce from 'lodash/debounce';
import { Decimal } from 'decimal.js';

export default class WalletPanelFormStakeInputs extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      cpuAmount: props.cpuOriginal,
      formError: false,
      netAmount: props.netOriginal
    };
  }

  componentDidMount = () => {
    const {
      cpuAmount,
      netAmount
    } = this.props;

    this.setState({
      cpuAmount,
      netAmount
    });
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value,
    });

    const error = this.errorsInForm();

    if (error) {
      this.setState({
        formError: error
      });
    }
  }, 300)

  onSubmit = (e) => {
    if (!this.errorsInForm()) {
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

  onConfirm = () => {
    const {
      account,
      actions
    } = this.props;

    const {
      cpuAmount,
      netAmount
    } = this.state;

    const {
      setStake
    } = actions;

    this.setState({
      confirming: false
    });

    setStake(account, netAmount, cpuAmount);
  }

  errorsInForm = () => {
    const {
      cpuOriginal,
      EOSbalance,
      netOriginal
    } = this.props;

    const {
      cpuAmount,
      netAmount,
    } = this.state;

    const decimalRegex = /^\d+(\.\d{1,4})?$/;

    if (!decimalRegex.test(cpuAmount) || !decimalRegex.test(netAmount)) {
      return 'not_valid_stake_amount';
    }

    const decimalCpuAmount = Decimal(cpuAmount);
    const decimalNetAmount = Decimal(netAmount);

    if (cpuOriginal.equals(decimalCpuAmount) && netOriginal.equals(decimalNetAmount)) {
      return true;
    }

    if (!decimalCpuAmount.greaterThan(0) || !decimalNetAmount.greaterThan(0)) {
      return 'no_stake_left';
    }

    const cpuChange = (decimalCpuAmount - cpuOriginal);
    const netChange = (decimalNetAmount - netOriginal);

    if (Math.max(0, cpuChange) + Math.max(0, netChange) > EOSbalance) {
      return 'not_enough_balance';
    }

    return false;
  }

  render() {
    const {
      account,
      actions,
      cpuOriginal,
      EOSbalance,
      netOriginal,
      onClose,
      validate
    } = this.props;
    const {
      cpuAmount,
      netAmount
    } = this.state;

    const disabled = this.errorsInForm();

    if (this.state.confirming) {
      const decimalCpuAmount = this.state.cpuAmount;
      const decimalNetAmount = this.state.netAmount;

      return (
        <WalletPanelFormStakeInputsConfirming
          account={account}
          actions={actions}
          decimalCpuAmount={decimalCpuAmount}
          cpuOriginal={cpuOriginal}
          EOSbalance={EOSbalance}
          decimalNetAmount={decimalNetAmount}
          netOriginal={netOriginal}
          onClose={onClose}
          onConfirm={this.onConfirm}
          validate={validate}
        />
      );
    }
    return (
      <I18n ns="stake">
        {
          (t) => (
            <Form
              onKeyPress={this.onKeyPress}
              onSubmit={this.onSubmit}
            >
              <Form.Group widths="equal">
                <Form.Field
                  autoFocus
                  control={Input}
                  fluid
                  label={t('update_staked_cpu_amount')}
                  name="cpuAmount"
                  onChange={this.onChange}
                  defaultValue={cpuAmount}
                />
                <Form.Field
                  control={Input}
                  fluid
                  label={t('update_staked_net_amount')}
                  name="netAmount"
                  onChange={this.onChange}
                  defaultValue={netAmount}
                />
                {(this.state.formError)
                  ? (
                    <Message
                      failure
                      content={t(this.state.formError)}
                    />
                  ) : ''}

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
                disabled={disabled}
                floated="right"
                primary
              />
            </Form>
          )
        }
      </I18n>
    );
  }
}

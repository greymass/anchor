// @flow
import React, { Component } from 'react';
import { Decimal } from 'decimal.js';

import FormFieldToken from '../../../../Global/Form/Field/Token';

export default class WalletPanelFormStakeInput extends Component<Props> {
  onChange = (e, { name, value }) => {
    const {
      onChange,
      onError
    } = this.props;

    this.setState({
      value
    });

    const error = this.errorsInForm();

    if (error) {
      onError(error);
    } else {
      onChange(name, value);
    }
  }

  errorsInForm = () => {
    const {
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      EOSbalance,
      netOriginal
    } = this.props;

    let cpuAmount = decimalCpuAmount;
    let netAmount = decimalNetAmount;

    if (this.props.name === 'cpuAmount') {
      cpuAmount = Decimal(this.state.value);
    } else {
      netAmount = Decimal(this.state.value);
    }

    const decimalRegex = /^\d+(\.\d{1,4})?$/;

    if (!decimalRegex.test(cpuAmount) || !decimalRegex.test(netAmount)) {
      return 'not_valid_stake_amount';
    }

    if (cpuOriginal.equals(cpuAmount) && netOriginal.equals(netAmount)) {
      return true;
    }

    if (!cpuAmount.greaterThan(0) || !netAmount.greaterThan(0)) {
      return 'no_stake_left';
    }

    const cpuChange = (cpuAmount - cpuOriginal);
    const netChange = (netAmount - netOriginal);

    if (Math.max(0, cpuChange) + Math.max(0, netChange) > EOSbalance) {
      return 'not_enough_balance';
    }

    return false;
  }

  render() {
    const {
      defaultValue,
      label,
      icon,
      name
    } = this.props;

    return (
      <FormFieldToken
        autoFocus
        icon={icon}
        label={label}
        loading={false}
        name={name}
        onChange={this.onChange}
        defaultValue={defaultValue.toFixed(4)}
      />
    );
  }
}

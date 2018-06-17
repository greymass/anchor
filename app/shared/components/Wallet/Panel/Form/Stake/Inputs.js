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
      cpuAmount: props.cpuOriginal,
      netAmount: props.netOriginal
    }
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: parseFloat(value),
    });
  }, 300)

  onSubmit = (e) => {
    const {
      account,
      actions,
      EOSbalance
    } = this.props;

    const {
      cpuAmount,
      netAmount
    } = this.state;

    const {
      realNetAmount,
      realCpuAmount
    } = this.cleanUpStakeAmounts(account, netAmount, cpuAmount);

    this.setState({
      netAmount: realNetAmount,
      cpuAmount: realCpuAmount
    });

    const { setStakeConfirmingWithValidation } = actions;

    setStakeConfirmingWithValidation(EOSbalance, account, realNetAmount, realCpuAmount);
    e.preventDefault();
    return false;
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      const {
        cpuOriginal,
        netOriginal,
      } = this.props;
      const {
        cpuAmount,
        netAmount
      } = this.state;
      if (!Decimal(cpuOriginal).equals(cpuAmount) || !Decimal(netOriginal).equals(netAmount)) {
        this.onSubmit(e);
      }
      e.preventDefault();
      return false;
    }
  }

  cleanUpStakeAmounts(account, netAmount, cpuAmount) {
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth;

    const cleanedNetAmount = netAmount === '' ? net_weight : netAmount;
    const cleanedCpuAmount = cpuAmount === '' ? cpu_weight : cpuAmount;

    return {
      realNetAmount: new Decimal(cleanedNetAmount),
      realCpuAmount: new Decimal(cleanedCpuAmount)
    };
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
    const disabled = Decimal(cpuOriginal).equals(cpuAmount) && Decimal(netOriginal).equals(netAmount)

    if (validate.STAKE === 'CONFIRMING') {
      return (
        <WalletPanelFormStakeInputsConfirming
          account={account}
          actions={actions}
          cleanUpStakeAmounts={this.cleanUpStakeAmounts}
          cpuAmount={this.state.cpuAmount}
          cpuOriginal={cpuOriginal}
          EOSbalance={EOSbalance}
          netAmount={this.state.netAmount}
          netOriginal={netOriginal}
          onClose={onClose}
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
                  defaultValue={cpuAmount.toFixed(4)}
                />
                <Form.Field
                  control={Input}
                  fluid
                  label={t('update_staked_net_amount')}
                  name="netAmount"
                  onChange={this.onChange}
                  defaultValue={netAmount.toFixed(4)}
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

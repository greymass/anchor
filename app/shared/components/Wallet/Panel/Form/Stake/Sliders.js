// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';

import { Form, Divider, Message, Button, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class WalletPanelFormStakeSliders extends Component<Props> {
  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: parseFloat(value),
    });
  }, 300)

  onConfirm = () => {
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

    const { setStakeWithValidation } = actions;

    setStakeWithValidation(EOSbalance, account, realNetAmount, realCpuAmount);
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onConfirm();
    }
  }

  cleanUpStakeAmounts(account, netAmount, cpuAmount) {
    const {
      cpu_weight,
      net_weight
    } = account.total_resources;
    const cleanedNetAmount = netAmount || net_weight;
    const cleanedCpuAmount = cpuAmount || cpu_weight;

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
      cpuOriginal,
      netOriginal,
      onClose
    } = this.props;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Form
              onKeyPress={this.onKeyPress}
            >
              <Form.Group widths="equal">
                <Form.Field
                  autoFocus
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
          )
        }
      </I18n>
    );
  }
}

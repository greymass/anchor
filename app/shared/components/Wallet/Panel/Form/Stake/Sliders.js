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

  onConfirm = debounce(() => {
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
      cpuOriginal,
      netOriginal,
      onClose
    } = this.props;

    return (
      <I18n ns="stake">
        {
          (t) => (
            <Form>
              <Form.Group widths="equal">
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
          )
        }
      </I18n>
    );
  }
}

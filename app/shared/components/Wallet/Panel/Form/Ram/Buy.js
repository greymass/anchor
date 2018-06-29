// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Message, Button } from 'semantic-ui-react';

import WalletPanelFormRamBuyConfirming from './Buy/Confirming';
import WalletPanelFormRamStats from './Stats';
import FormMessageError from '../../../../Global/Form/Message/Error';
import FormFieldToken from '../../../../Global/Form/Field/Token';

type Props = {
  actions: {},
  account: {},
  balance: {},
  system: {}
};

class WalletPanelFormRamBuy extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { account } = props;

    this.state = {
      ramUsage: Decimal(account.ram_usage),
      ramQuota: Decimal(account.ram_quota),
      ramToBuy: 0,
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

  onChange = (name, ramToBuy) => {
    this.setState({
      submitDisabled: false,
      formError: null,
      ramToBuy: (ramToBuy * 1000)
    }, () => {
      const error = this.errorsInForm();
      if (error) {
        this.onError(error);
      }
    });
  }

  errorsInForm = () => {
    const {
      balance
    } = this.props;

    const {
      ramToBuy,
    } = this.state;

    const decimalRegex = /^\d+(\.\d{1,4})?$/;

    if (!decimalRegex.test(ramToBuy)) {
      return 'ram_error_not_valid_ram_amount';
    }

    const decimalRamToBuy = Decimal(ramToBuy);

    if (!decimalRamToBuy.greaterThan(0)) {
      return true;
    }

    const priceOfRam = Decimal(0.001);
    const costOfRam = priceOfRam.times(decimalRamToBuy);

    if (balance.EOS.lessThan(costOfRam)) {
      return 'ram_error_not_enough_balance';
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
      ramToBuy
    } = this.state;

    const {
      buyRam
    } = actions;

    this.setState({
      confirming: false
    });

    buyRam(account, ramToBuy);
  }

  render() {
    const {
      balance,
      onClose,
      system,
      t
    } = this.props;

    const {
      ramQuota,
      ramUsage,
      ramToSell,
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
              <WalletPanelFormRamStats
                ramQuota={ramQuota}
                ramUsage={ramUsage}
              />
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <Form.Group>
                  <FormFieldToken
                    autoFocus
                    icon="database"
                    label={t('ram_amount_to_sell')}
                    loading={false}
                    name="ram_to_sell"
                    onChange={this.onChange}
                    defaultValue={0}
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
            <WalletPanelFormRamBuyConfirming
              ramQuota={ramQuota}
              ramToSell={ramToSell}
              EOSbalance={balance.EOS}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('ram')(WalletPanelFormRamBuy);

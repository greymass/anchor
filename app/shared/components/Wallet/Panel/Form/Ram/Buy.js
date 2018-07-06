// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Grid, Button } from 'semantic-ui-react';

import WalletPanelFormRamBuyConfirming from './Buy/Confirming';
import WalletPanelFormRamStats from './Stats';
import FormMessageError from '../../../../Global/Form/Message/Error';
import FormFieldGeneric from '../../../../Global/Form/Field/Generic';

import calculatePriceOfRam from './helpers/calculatePriceOfRam';

type Props = {
  actions: {},
  account: {},
  balance: {},
  globals: {},
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
      ramToBuyInKbs: 0,
      confirming: false,
      formError: null,
      submitDisabled: true
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions
    } = this.props;

    const {
      getRamStats
    } = actions;

    getRamStats();
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

  onChange = (e, { value }) => {
    const {
      globals
    } = this.props;

    const decBaseBal = Decimal(globals.ram.base_balance);
    const decQuoteBal = Decimal(globals.ram.quote_balance);
    const decValueInBytes = Decimal(parseFloat(value)).times(1024);

    let priceOfRam = 0;

    if (decValueInBytes.greaterThan(0)) {
      priceOfRam = calculatePriceOfRam(decBaseBal, decQuoteBal, decValueInBytes).times(1.005);
    }

    this.setState({
      submitDisabled: false,
      formError: null,
      ramToBuyInKbs: value,
      priceOfRam
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
      ramToBuyInKbs,
      priceOfRam
    } = this.state;

    const decimalRegex = /^\d+(\.\d{1,3})?$/;

    if (!decimalRegex.test(ramToBuyInKbs)) {
      return 'ram_not_valid_amount';
    }

    const decimalRamToBuy = Decimal(ramToBuyInKbs).times(1024);

    if (!decimalRamToBuy.greaterThan(2)) {
      return 'ram_has_to_be_over_minimum_value';
    }

    if (!balance.EOS || Decimal(balance.EOS).lessThan(priceOfRam)) {
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
      ramToBuyInKbs
    } = this.state;

    const {
      buyrambytes
    } = actions;

    this.setState({
      confirming: false
    });

    buyrambytes(Decimal(ramToBuyInKbs).times(1024).floor());
  }

  render() {
    const {
      balance,
      onClose,
      settings,
      system,
      t
    } = this.props;

    const {
      priceOfRam,
      ramQuota,
      ramUsage,
      ramToBuyInKbs,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    return (
      <Segment
        loading={system.BUYRAM === 'PENDING'}
        style={{ minHeight: '100px' }}
      >
        {(shouldShowForm)
          ? (
            <Form
              onKeyPress={this.onKeyPress}
              onSubmit={this.onSubmit}
            >
              <Grid>
                <Grid.Column width={8}>
                  <WalletPanelFormRamStats
                    ramQuota={ramQuota}
                    ramUsage={ramUsage}
                  />
                </Grid.Column>
                <Grid.Column width={8}>
                  <FormFieldGeneric
                    autoFocus
                    icon="database"
                    label={t('ram_form_label_amount_to_buy')}
                    loading={false}
                    name="ram_to_buy"
                    onChange={this.onChange}
                    value={ramToBuyInKbs || '0.000'}
                  />
                </Grid.Column>
              </Grid>
              <FormMessageError
                style={{ marginTop: '20px' }}
                error={this.state.formError}
              />
              <Divider />
              <Button
                content={t('cancel')}
                color="grey"
                onClick={onClose}
              />
              <Button
                content={t('ram_form_button_buy')}
                color="green"
                disabled={submitDisabled}
                floated="right"
                primary
              />
            </Form>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormRamBuyConfirming
              EOSbalance={balance.EOS}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              priceOfRam={priceOfRam}
              ramQuota={ramQuota}
              ramToBuyinKbs={ramToBuyInKbs}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('ram')(WalletPanelFormRamBuy);

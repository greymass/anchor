// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Grid, Button } from 'semantic-ui-react';

import WalletPanelFormRamSellConfirming from './Sell/Confirming';
import WalletPanelFormRamStats from './Stats';
import FormMessageError from '../../../../Global/Form/Message/Error';
import FormFieldGeneric from '../../../../Global/Form/Field/Generic';

import calculatePriceOfRam from './helpers/calculatePriceOfRam';

type Props = {
  actions: {},
  account: {},
  globals: {},
  system: {}
};

class WalletPanelFormRamSell extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { account } = props;

    this.state = {
      ramUsage: Decimal(account.ram_usage),
      ramQuota: Decimal(account.ram_quota),
      ramToSellInKbs: 0,
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
      priceOfRam = calculatePriceOfRam(decBaseBal, decQuoteBal, decValueInBytes).times(0.995);
    }

    this.setState({
      submitDisabled: false,
      formError: null,
      ramToSellInKbs: value,
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
      ramQuota,
      ramUsage,
      ramToSellInKbs,
    } = this.state;

    const decimalRegex = /^\d+(\.\d{1,3})?$/;

    if (!decimalRegex.test(ramToSellInKbs)) {
      return 'ram_not_valid_amount';
    }

    const decimalRamToSell = Decimal(ramToSellInKbs).times(1024);

    if (!decimalRamToSell.greaterThan(0)) {
      return true;
    }

    const ramLeft = ramQuota.minus(decimalRamToSell);

    if (ramLeft.lessThan(ramUsage)) {
      return 'ram_using_more_than_usage';
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
      ramToSellInKbs
    } = this.state;

    const {
      sellram
    } = actions;

    this.setState({
      confirming: false
    });

    sellram(Decimal(ramToSellInKbs).times(1024).floor());
  }

  render() {
    const {
      account,
      globals,
      onClose,
      settings,
      system,
      t
    } = this.props;

    const {
      ramQuota,
      ramUsage,
      ramToSellInKbs,
      submitDisabled,
      priceOfRam
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    return (
      <Segment
        loading={system.SELLRAM === 'PENDING'}
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
                    label={t('ram_form_label_amount_to_sell')}
                    loading={false}
                    name="ram_to_sell"
                    onChange={this.onChange}
                    value={ramToSellInKbs || '0.000'}
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
                content={t('ram_form_button_sell')}
                color="green"
                disabled={submitDisabled}
                floated="right"
                primary
              />
            </Form>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormRamSellConfirming
              account={account}
              ramQuota={ramQuota}
              ramToSellInKbs={ramToSellInKbs}
              priceOfRam={priceOfRam}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('ram')(WalletPanelFormRamSell);

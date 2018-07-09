// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Grid, Button, Menu } from 'semantic-ui-react';

import WalletPanelFormRamConfirming from './Confirming';
import WalletPanelFormRamStats from './Stats';
import FormMessageError from '../../../../Global/Form/Message/Error';

import FormFieldToken from '../../../../Global/Form/Field/Token';

import WalletPanelFormRamByAmount from './ByAmount';
import WalletPanelFormRamByCost from './ByCost';

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
      activeTab: 'byRAMAmount',
      ramUsage: account.ram_usage,
      ramQuota: account.ram_quota,
      ramToBuy: 0,
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

  onChange = (amountOfRam, priceOfRam) => {
    this.setState({
      formError: null,
      amountToBuy: value,
      priceOfRam
    }, () => {
      const error = this.errorsInForm();

      onChange(e, { name, value });

      if (error) {
        onError(error);
      }
    });
  }

  errorsInForm = () => {
    const {
      balance
    } = this.props;

    const {
      amountToBuy,
      priceOfRam
    } = this.state;

    const decimalRegex = /^\d+$/;

    if (!decimalRegex.test(amountToBuy)) {
      return 'ram_not_valid_amount';
    }

    const decimalRamToBuy = Decimal(amountToBuy);

    if (!decimalRamToBuy > 2) {
      return 'ram_has_to_be_over_minimum_amount';
    }

    if (!balance.EOS || Decimal(balance.EOS).lessThan(priceOfRam)) {
      return 'not_enough_balance';
    }

    return false;
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
      ramToBuy
    } = this.state;

    const {
      buyrambytes
    } = actions;

    this.setState({
      confirming: false
    });

    buyrambytes(ramToBuy);
  }

  handleTabClick = (e, { name }) => this.setState({ activeTab: name })

  render() {
    const {
      balance,
      onClose,
      settings,
      system,
      t
    } = this.props;

    const {
      activeTab,
      amountOfRam,
      formError,
      priceOfRam,
      ramQuota,
      ramUsage,
      ramToBuy,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    return (
      <Segment
        loading={system.BUYRAM === 'PENDING'}
        style={{ minHeight: '100px' }}
      >
        <Menu tabular>
          <Menu.Item name="byRAMAmount" active={activeTab === 'byRAMAmount'} onClick={this.handleTabClick} />
          <Menu.Item name="byEOSAmount" active={activeTab === 'byEOSAmount'} onClick={this.handleTabClick} />
        </Menu>

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
                  {(activeTab === 'byRAMAmount')
                    ? (
                      <WalletPanelFormRamByAmount
                        globals={globals}
                        onChange={onChange}
                        onError={this.onError}
                      />
                    ) : (
                      <WalletPanelFormRamByCost
                        globals={globals}
                        onChange={onChange}
                        onError={this.onError}
                      />
                    )
                  }
                </Grid.Column>
              </Grid>

              <FormMessageError
                style={{ marginTop: '20px' }}
                error={formError}
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
            <WalletPanelFormRamConfirming
              buying
              ramAmount={ramToBuy}
              newRamAmount={ramQuota + Number(ramToBuy)}
              EOSbalance={balance.EOS}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              priceOfRam={priceOfRam}
              ramQuota={ramQuota}
              ramToBuy={ramToBuy}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}

export default translate('ram')(WalletPanelFormRamBuy);

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Grid, Button, Menu } from 'semantic-ui-react';

import WalletPanelFormRamConfirming from './Confirming';
import WalletPanelFormRamStats from './Stats';
import FormMessageError from '../../../../Global/Form/Message/Error';

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
    const { account, connection, settings } = props;

    this.state = {
      activeTab: 'byRAMAmount',
      ramTabName: 'by' + settings.blockchain.tokenSymbol + 'Amount',
      ramUsage: account.ram_usage,
      ramQuota: account.ram_quota,
      ramToBuy: null,
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
      ramToBuy: amountOfRam,
      submitDisabled: false,
      priceOfRam: Decimal(priceOfRam).times(1.005)
    }, () => {
      const error = this.errorsInForm();

      if (error) {
        this.onError(error);
      }
    });
  }

  errorsInForm = () => {
    const {
      balance,
      connection,
      settings
    } = this.props;

    const {
      ramToBuy,
      priceOfRam
    } = this.state;

    const decimalRegex = /^\d+$/;

    if (!decimalRegex.test(ramToBuy)) {
      return 'ram_not_valid_amount';
    }

    if (!(Number(ramToBuy) > 2)) {
      return 'ram_has_to_be_over_minimum_amount';
    }

    if (!balance[settings.blockchain.tokenSymbol] || 
      Decimal(balance[settings.blockchain.tokenSymbol]).lessThan(priceOfRam)) {
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
      priceOfRam,
      ramToBuy
    } = this.state;

    const {
      activeTab,
      buyrambytes,
      buyram
    } = actions;

    this.setState({
      confirming: false
    });

    if (activeTab === 'byRAMAmount') {
      buyrambytes(ramToBuy);
    } else {
      buyram(priceOfRam);
    }
  }

  handleTabClick = (e, { name }) => this.setState({ activeTab: name, confirming: false })

  render() {
    const {
      balance,
      globals,
      onClose,
      settings,
      system,
      t,
      connection
    } = this.props;

    const {
      activeTab,
      formError,
      priceOfRam,
      ramQuota,
      ramUsage,
      ramToBuy,
      submitDisabled,
      ramTabName
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
            <div>
              <Menu tabular>
                <Menu.Item name="byRAMAmount" active={activeTab === 'byRAMAmount'} onClick={this.handleTabClick} />
                <Menu.Item name={ramTabName} active={activeTab === ramTabName} onClick={this.handleTabClick} />
              </Menu>
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <Grid>
                  <Grid.Column width={8}>
                    {(activeTab === 'byRAMAmount')
                      ? (
                        <WalletPanelFormRamByAmount
                          amountOfRam={ramToBuy}
                          connection={connection}
                          formError={formError}
                          globals={globals}
                          onChange={this.onChange}
                          onError={this.onError}
                          settings={settings}
                        />
                      ) : (
                        <WalletPanelFormRamByCost
                          connection={connection}
                          formError={formError}
                          globals={globals}
                          onChange={this.onChange}
                          onError={this.onError}
                          priceOfRam={priceOfRam}
                          settings={settings}
                        />
                      )
                    }
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <WalletPanelFormRamStats
                      connection={connection}
                      EOSbalance={balance[settings.blockchain.tokenSymbol]}
                      ramQuota={ramQuota}
                      ramUsage={ramUsage}
                      settings={settings}
                    />
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
            </div>
          ) : ''} 

        {(shouldShowConfirm)
          ? (
            <WalletPanelFormRamConfirming
              buying
              ramAmount={ramToBuy}
              newRamAmount={ramQuota + Number(ramToBuy)}
              EOSbalance={balance[settings.blockchain.tokenSymbol]}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              priceOfRam={priceOfRam}
              ramQuota={ramQuota}
              settings={settings}
              connection={connection}
            />
          ) : ''}
      </Segment>
    );
  }
}

export default translate('ram')(WalletPanelFormRamBuy);

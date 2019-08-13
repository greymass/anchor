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
import JurisdictionsForm from '../Jurisdictions';
import checkForBeos from '../../../../helpers/checkCurrentBlockchain';

type Props = {
  actions: {},
  account: {},
  balance: {},
  connection: {},
  globals: {},
  system: {},
  jurisdictions: {}
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
      connection
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

    const chainSymbolBalance = balance[connection.chainSymbol || 'EOS'];

    if (!chainSymbolBalance || Decimal(chainSymbolBalance).lessThan(priceOfRam)) {
      return 'error_insufficient_balance';
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
      connection,
      globals,
      onClose,
      settings,
      system,
      t,
      jurisdictions
    } = this.props;

    const {
      activeTab,
      formError,
      priceOfRam,
      ramQuota,
      ramUsage,
      ramToBuy,
      submitDisabled
    } = this.state;

    let jurisdictionsForm = (<div />);

    if (checkForBeos(connection)) {
      jurisdictionsForm = (
        <React.Fragment>
          <Divider />
          <JurisdictionsForm
            actions={this.props.actions}
            jurisdictions={jurisdictions}
            label={t('transfer_label_jurisdictions')}
          />
        </React.Fragment>
      );
    }

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
                <Menu.Item name="byAmount" active={activeTab === 'byAmount'} onClick={this.handleTabClick} />
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
                        />
                      ) : (
                        <WalletPanelFormRamByCost
                          connection={connection}
                          formError={formError}
                          globals={globals}
                          onChange={this.onChange}
                          onError={this.onError}
                          priceOfRam={priceOfRam}
                        />
                      )
                    }
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <WalletPanelFormRamStats
                      chainSymbolBalance={balance[connection.chainSymbol || 'EOS']}
                      connection={connection}
                      ramQuota={ramQuota}
                      ramUsage={ramUsage}
                    />
                  </Grid.Column>
                </Grid>

                <FormMessageError
                  style={{ marginTop: '20px' }}
                  error={formError}
                />
                {jurisdictionsForm}
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
              connection={connection}
              ramAmount={ramToBuy}
              newRamAmount={ramQuota + Number(ramToBuy)}
              chainSymbolBalance={balance[connection.chainSymbol || 'EOS']}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              priceOfRam={priceOfRam}
              ramQuota={ramQuota}
              settings={settings}
            />
          ) : ''}
      </Segment>
    );
  }
}

export default translate('ram')(WalletPanelFormRamBuy);

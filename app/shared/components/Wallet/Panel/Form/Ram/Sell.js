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
  balances: {},
  globals: {},
  settings: {},
  system: {},
  t: () => void
};

class WalletPanelFormRamSell extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    const { account } = props;

    this.state = {
      activeTab: 'byAmount',
      confirming: false,
      formError: null,
      ramQuota: Number(account.ram_quota),
      ramToSell: null,
      ramUsage: Number(account.ram_usage),
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

  onChange = (amountOfRam, priceOfRam) => {
    this.setState({
      formError: null,
      ramToSell: Number(amountOfRam),
      submitDisabled: false,
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
      ramToSell,
    } = this.state;

    const decimalRegex = /^\d+$/;

    if (!decimalRegex.test(ramToSell)) {
      return 'ram_not_valid_amount';
    }


    if (!ramToSell > 0) {
      return true;
    }

    const ramLeft = ramQuota - ramToSell;

    if (ramLeft < ramUsage) {
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
      ramToSell
    } = this.state;

    const {
      sellram
    } = actions;

    this.setState({
      confirming: false
    });

    sellram(Decimal(ramToSell));
  }

  handleTabClick = (e, { name }) => this.setState({ activeTab: name, confirming: false })

  render() {
    const {
      balances,
      connection,
      globals,
      onClose,
      settings,
      system,
      t
    } = this.props;

    const {
      activeTab,
      formError,
      ramQuota,
      ramUsage,
      ramToSell,
      submitDisabled,
      priceOfRam
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    return (
      <React.Fragment>
        <Menu attached="top" tabular>
          <Menu.Item name="byAmount" active={activeTab === 'byAmount'} onClick={this.handleTabClick} />
          <Menu.Item name="byRAMAmount" active={activeTab === 'byRAMAmount'} onClick={this.handleTabClick} />
        </Menu>
        <Segment
          attached="bottom"
          loading={system.SELLRAM === 'PENDING'}
          style={{ minHeight: '100px' }}
        >
          {(shouldShowForm)
            ? (
              <div>
                <Form
                  onKeyPress={this.onKeyPress}
                  onSubmit={this.onSubmit}
                >
                  <Grid>
                    <Grid.Column width={8}>
                      {(activeTab === 'byRAMAmount')
                        ? (
                          <WalletPanelFormRamByAmount
                            amountOfRam={ramToSell}
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
                        chainSymbolBalance={balances[settings.account][connection.chainSymbol || 'EOS']}
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
              </div>
            ) : ''}

          {(shouldShowConfirm)
            ? (
              <WalletPanelFormRamConfirming
                connection={connection}
                ramAmount={ramToSell}
                priceOfRam={priceOfRam}
                onBack={this.onBack}
                onConfirm={this.onConfirm}
                settings={settings}
                newRamAmount={ramQuota - Number(ramToSell)}
              />
            ) : ''}
        </Segment>
      </React.Fragment>
    );
  }
}


export default translate('ram')(WalletPanelFormRamSell);

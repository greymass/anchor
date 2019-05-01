// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Dimmer, Divider, Form, Loader, Message, Button, Header } from 'semantic-ui-react';

import WalletPanelFormStakeStats from './Stake/Stats';
import WalletPanelFormStakeConfirming from './Stake/Confirming';
import FormMessageError from '../../../Global/Form/Message/Error';

import GlobalFormFieldAccount from '../../../Global/Form/Field/Account';
import GlobalFormFieldToken from '../../../Global/Form/Field/Token';
import EOSAccount from '../../../../utils/EOS/Account';

class WalletPanelFormStake extends Component<Props> {
  constructor(props) {
    super(props);
    const { account, balance } = props;
    const {
      cpu_weight,
      net_weight
    } = account.self_delegated_bandwidth;

    const parsedCpuWeight = String(cpu_weight).split(' ')[0];
    const parsedNetWeight = String(net_weight).split(' ')[0];

    const eosAccount = new EOSAccount(account, balance);
    const { totalBeingUnstaked } = eosAccount.getAllStats();

    this.state = {
      accountName: account.account_name,
      accountNameValid: true,
      confirming: false,
      cpuAmountValid: true,
      cpuOriginal: Decimal(parsedCpuWeight),
      decimalCpuAmount: Decimal(parsedCpuWeight),
      decimalNetAmount: Decimal(parsedNetWeight),
      chainSymbolBalance: (props.balance && props.balance[props.connection.chainSymbol || 'EOS']) ||  0,
      formError: null,
      netAmountValid: true,
      netOriginal: Decimal(parsedNetWeight),
      submitDisabled: true,
      totalBeingUnstaked
    };
    this.original = Object.assign({}, this.state);
  }

  componentWillMount() {
    const {
      accountName,
      confirming,
      cpuAmount,
      cpuOriginal,
      netAmount,
      netOriginal
    } = this.props;

    this.setState({
      accountName: accountName || '',
      confirming,
      cpuOriginal: cpuOriginal || cpuAmount || Decimal(0),
      decimalCpuAmount: cpuAmount || Decimal(0),
      decimalNetAmount: netAmount || Decimal(0),
      netOriginal: netOriginal || netAmount || Decimal(0)
    });
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

  onChange = (e, { name, value, valid }) => {
    const {
      actions
    } = this.props;

    const {
      checkAccountExists
    } = actions;

    const newState = {
      [name]: value,
      formError: null,
      submitDisabled: false
    };

    if (name === 'accountName') {
      checkAccountExists(value);
    } else {
      const decimalFieldName = `decimal${name.charAt(0).toUpperCase()}${name.slice(1)}`;
      newState[decimalFieldName] = Decimal(value.split(' ')[0]);
    }

    newState[`${name}Valid`] = valid;

    this.setState(newState, () => {
      const error = this.errorsInForm();
      if (error) {
        this.onError(error);
      }
    });
  }

  errorsInForm = () => {
    const {
      account
    } = this.props;

    const {
      accountName,
      accountNameValid,
      cpuAmountValid,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      chainSymbolBalance,
      netAmountValid,
      netOriginal,
      totalBeingUnstaked
    } = this.state;

    if (!accountNameValid) {
      return 'not_valid_account_name';
    }

    if (!cpuAmountValid || !netAmountValid) {
      return 'not_valid_stake_amount';
    }

    if (!accountNameValid) {
      return 'not_valid_account_name';
    }

    if (cpuOriginal.equals(decimalCpuAmount) && netOriginal.equals(decimalNetAmount)) {
      return true;
    }

    const cpuDifference = cpuOriginal.minus(decimalCpuAmount);
    const netDifference = netOriginal.minus(decimalNetAmount);
    const cpuWeightDecimal = Decimal(account.cpu_weight / 10000);
    const netWeightDecimal = Decimal(account.net_weight / 10000);

    if (account.account_name === accountName &&
      (cpuWeightDecimal.equals(cpuDifference) || netWeightDecimal.equals(netDifference))) {
      return 'no_stake_left';
    }

    const cpuChange = decimalCpuAmount.minus(cpuOriginal);
    const netChange = decimalNetAmount.minus(netOriginal);

    if (Decimal.max(0, cpuChange)
      .plus(Decimal.max(0, netChange))
      .greaterThan(Decimal(chainSymbolBalance).plus(totalBeingUnstaked))) {
      return 'insufficient_balance';
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
      accountName,
      decimalCpuAmount,
      decimalNetAmount
    } = this.state;

    const {
      setStake
    } = actions;

    this.setState({
      confirming: false
    });

    setStake(accountName, decimalNetAmount, decimalCpuAmount);
  }

  onCancel = (e) => {
    console.log(Object.assign({}, this.original, {
      formId: new Date()
    }));
    this.setState(Object.assign({}, this.original, {
      formId: new Date()
    }));
    if (this.props.onClose) {
      this.props.onClose();
    }
    e.preventDefault();
    return false;
  };

  render() {
    const {
      account,
      balance,
      connection,
      system,
      settings,
      t
    } = this.props;

    const {
      accountName,
      chainSymbolBalance,
      cpuOriginal,
      decimalCpuAmount,
      decimalNetAmount,
      formId,
      netOriginal,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    let {
      formError
    } = this.state;

    if (system.ACCOUNT_EXISTS === 'FAILURE' &&
        system.ACCOUNT_EXISTS_LAST_ACCOUNT === accountName) {
      formError = formError || 'account_does_not_exist';
    }
    return (
      <React.Fragment>
        <Dimmer active={system.STAKE === 'PENDING'}>
          <Loader>{t('waiting')}</Loader>
        </Dimmer>
        {(shouldShowForm)
          ? (
            <div>
              {(this.props.accountName && this.props.accountName !== account.account_name)
                ?
                (
                  <Header>
                    {t('update_stake_for_other_header')}
                    <u>{this.props.accountName}</u>
                  </Header>
                ) : ''}
              <WalletPanelFormStakeStats
                connection={connection}
                cpuOriginal={cpuOriginal}
                chainSymbolBalance={chainSymbolBalance}
                netOriginal={netOriginal}
              />
              <Form
                key={formId}
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                {(!this.props.accountName)
                  ? (
                    <Form.Group widths="equal">
                      <GlobalFormFieldAccount
                        value={accountName}
                        label={t('update_staked_account_name')}
                        name="accountName"
                        onChange={this.onChange}
                      />
                    </Form.Group>
                  ) : ''}
                <Form.Group widths="equal">
                  <GlobalFormFieldToken
                    autoFocus
                    icon="microchip"
                    label={t('update_staked_cpu_amount_label', { chainSymbol: connection.chainSymbol })}
                    name="cpuAmount"
                    onChange={this.onChange}
                    defaultValue={decimalCpuAmount.toFixed(4)}
                    value={decimalCpuAmount.toFixed(4)}
                  />

                  <GlobalFormFieldToken
                    autoFocus
                    icon="wifi"
                    label={t('update_staked_net_amount_label', { chainSymbol: connection.chainSymbol })}
                    name="netAmount"
                    onChange={this.onChange}
                    defaultValue={decimalNetAmount.toFixed(4)}
                    value={decimalNetAmount.toFixed(4)}
                  />
                </Form.Group>
                <Header textAlign="center">
                  {(chainSymbolBalance).toFixed(4)} {connection.chainSymbol || 'EOS'}
                  <Header.Subheader>
                    {t('amount_unstaked')}
                  </Header.Subheader>
                </Header>
                <FormMessageError
                  error={formError}
                  chainSymbol={connection.chainSymbol}
                />
                <Divider />
                <Message
                  icon="info circle"
                  info
                  content={t('undelegate_explanation_message', { chainSymbol: connection.chainSymbol })}
                />
                <Divider />
                <Button
                  content={t('reset')}
                  color="grey"
                  onClick={this.onCancel}
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
            <WalletPanelFormStakeConfirming
              account={account}
              accountName={accountName}
              balance={balance}
              connection={connection}
              decimalCpuAmount={decimalCpuAmount}
              cpuOriginal={cpuOriginal}
              chainSymbolBalance={chainSymbolBalance}
              decimalNetAmount={decimalNetAmount}
              netOriginal={netOriginal}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              settings={settings}
            />
          ) : ''}
      </React.Fragment>
    );
  }
}


export default translate('stake')(WalletPanelFormStake);

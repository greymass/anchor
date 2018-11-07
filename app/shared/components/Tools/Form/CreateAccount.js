// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';
import debounce from 'lodash/debounce';

import { Segment, Form, Button, Message } from 'semantic-ui-react';

import GlobalFormFieldRam from '../../Global/Form/Field/Ram';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldKeyPublic from '../../Global/Form/Field/Key/Public';
import FormMessageError from '../../Global/Form/Message/Error';
import ToolsFormCreateAccountConfirming from './CreateAccount/Confirming';
import calculatePriceOfRam from '../../helpers/calculatePriceOfRam';

const formAttributes = ['accountName', 'activeKeyValue', 'ownerKeyValue', 'delegatedBw', 'delegatedCpu', 'ramAmount'];

class ToolsFormCreateAccount extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      accountName,
      activeKeyValue,
      balance,
      connection,
      delegatedBw,
      delegatedCpu,
      ownerKeyValue,
      ramAmount
    } = props;

    this.state = {
      accountName,
      activeKeyValue,
      confirming: false,
      delegatedBw,
      delegatedCpu,
      chainSymbolBalance: balance && balance[connection.chainSymbol] || 0,
      formErrors: {},
      ownerKeyValue,
      ramAmount,
      submitDisabled: true
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      account,
      actions
    } = this.props;
    const {
      getCurrencyBalance,
      getRamStats
    } = actions;

    if (account) {
      getCurrencyBalance(account.account_name);
    }

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

  onChange = debounce((e, { name, value, valid }) => {
    this.setState({
      submitDisabled: false,
      [name]: value
    }, () => {
      let {
        formErrors,
        ramPrice
      } = this.state;

      const {
        accountName
      } = this.state;

      const {
        actions,
        globals
      } = this.props;

      const {
        checkAccountAvailability
      } = actions;

      if (name === 'accountName' && accountName.length !== 0) {
        checkAccountAvailability(accountName);
      }

      if (name === 'ramAmount' && globals.ram) {
        const decBaseBal = Decimal(globals.ram.base_balance);
        const decQuoteBal = Decimal(globals.ram.quote_balance);

        ramPrice = calculatePriceOfRam(decBaseBal, decQuoteBal, Decimal(Number(value)));
      }

      let submitDisabled = false;

      if (!valid) {
        formErrors[name] = `invalid_${name}`;
      } else {
        formErrors[name] = null;
      }

      if (this.allFieldsHaveValidFormat()) {
        ({ formErrors, submitDisabled } = this.errorsInForm(formErrors));
      } else {
        submitDisabled = true;
      }

      this.setState({
        formErrors,
        ramPrice,
        submitDisabled
      });
    });
  }, 200)

  onToggle = (e, { name }) => {
    this.setState({
      [name]: !this.state[name]
    });
  }

  allFieldsHaveValidFormat = () => {
    const {
      formErrors
    } = this.state;

    let validFormat = true;

    formAttributes.forEach((attribute) => {
      if (!this.state[attribute] || formErrors[attribute] === `invalid_${attribute}`) {
        validFormat = false;
      }
    });

    return validFormat;
  }

  errorsInForm = (errors, disabled) => {
    const {
      delegatedBw,
      delegatedCpu,
      chainSymbolBalance,
      ramAmount,
      ramPrice
    } = this.state;

    const formErrors = errors;
    let submitDisabled = disabled;

    formAttributes.forEach((attribute) => {
      formErrors[attribute] = null;
    });

    if (Number(ramAmount) < 2600) {
      formErrors.ramAmount = 'ram_under_minimum_of_2600_for_new_account';
      submitDisabled = true;
    }

    if (parseFloat(delegatedCpu) === 0) {
      formErrors.delegatedCpu = 'not_enough_delegated_cpu_for_new_account';
      submitDisabled = true;
    }

    if (parseFloat(delegatedBw) === 0) {
      formErrors.delegatedBw = 'not_enough_delegated_bw_for_new_account';
      submitDisabled = true;
    }

    const decimalBalance = Decimal(chainSymbolBalance);
    const decimalDelegatedBw = Decimal(delegatedBw.split(' ')[0]);
    const decimalDelegatedCpu = Decimal(delegatedCpu.split(' ')[0]);

    const decimalDelegatedResources = decimalDelegatedBw.plus(decimalDelegatedCpu);

    if (ramPrice.plus(decimalDelegatedResources).greaterThan(decimalBalance)) {
      if (delegatedBw > 1) {
        formErrors.delegatedBw = 'error_insufficient_balance';
      } else if (delegatedCpu > 1) {
        formErrors.delegatedCpu = 'error_insufficient_balance';
      } else {
        formErrors.ramAmount = 'error_insufficient_balance';
      }

      submitDisabled = true;
    }

    return { formErrors, submitDisabled };
  }

  onBack = () => {
    this.setState({
      confirming: false
    });
  }

  onConfirm = () => {
    this.setState({
      confirming: false
    });

    const {
      actions
    } = this.props;

    const {
      createAccount
    } = actions;

    const {
      accountName,
      activeKeyValue,
      delegatedBw,
      delegatedCpu,
      ownerKeyValue,
      ramAmount,
      transferTokens
    } = this.state;

    createAccount(
      accountName,
      activeKeyValue,
      delegatedBw,
      delegatedCpu,
      ownerKeyValue,
      ramAmount,
      transferTokens
    );
  }

  render() {
    const {
      connection,
      hideCancel,
      onClose,
      system,
      t
    } = this.props;

    const {
      accountName,
      activeKeyValue,
      contacts,
      delegatedBw,
      delegatedCpu,
      formErrors,
      ownerKeyValue,
      ramAmount,
      ramPrice,
      transferTokens
    } = this.state;

    let {
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    if (accountName &&
        accountName.length !== 0 &&
        system.ACCOUNT_AVAILABLE === 'FAILURE' &&
        system.ACCOUNT_AVAILABLE_LAST_ACCOUNT === accountName) {
      formErrors.accountName = 'account_name_not_available';
      submitDisabled = true;
    }

    if (system.ACCOUNT_AVAILABLE === 'FAILURE') {
      submitDisabled = true;
    }

    const formErrorKeys = Object.keys(formErrors);

    const decimalDelegatedBw = delegatedBw && Decimal(delegatedBw.split(' ')[0]);
    const decimalDelegatedCpu = delegatedCpu && Decimal(delegatedCpu.split(' ')[0]);

    let totalDelegated;

    if (decimalDelegatedBw && decimalDelegatedCpu) {
      totalDelegated = decimalDelegatedBw.plus(decimalDelegatedCpu);
    }

    const shouldShowAccountNameWarning = accountName && accountName.length !== 12;

    const shouldShowPublicKeysWarning = activeKeyValue && activeKeyValue === ownerKeyValue;

    const shouldShowDelegatedResourceWarning =
      (decimalDelegatedBw &&
        decimalDelegatedBw.lessThan(1) &&
        decimalDelegatedBw.greaterThan(0)) ||
      (decimalDelegatedCpu &&
        decimalDelegatedCpu.lessThan(1) &&
        decimalDelegatedCpu.greaterThan(0));

    const shouldShowtransferTokensWarning = transferTokens;

    const hasWarnings = shouldShowAccountNameWarning ||
                        shouldShowPublicKeysWarning ||
                        shouldShowDelegatedResourceWarning ||
                        shouldShowtransferTokensWarning;

    return (
      <Segment
        loading={system.CREATEACCOUNT === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              <Form
                warning={hasWarnings}
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <GlobalFormFieldKeyPublic
                  connection={connection}
                  defaultValue={ownerKeyValue || ''}
                  label={t('tools_form_create_account_owner_key')}
                  name="ownerKeyValue"
                  onChange={this.onChange}
                />
                <GlobalFormFieldKeyPublic
                  connection={connection}
                  defaultValue={activeKeyValue || ''}
                  label={t('tools_form_create_account_active_key')}
                  name="activeKeyValue"
                  onChange={this.onChange}
                />
                <GlobalFormFieldAccount
                  contacts={contacts}
                  label={t('tools_form_create_account_account_name')}
                  name="accountName"
                  onChange={this.onChange}
                  value={accountName || ''}
                />
                <GlobalFormFieldRam
                  defaultValue={ramAmount || ''}
                  label={t('tools_form_create_account_ram_amount')}
                  name="ramAmount"
                  onChange={this.onChange}
                />
                <GlobalFormFieldToken
                  connection={connection}
                  defaultValue={delegatedBw && delegatedBw.split(' ')[0]}
                  label={t('tools_form_create_account_delegated_bw_label', { chainSymbol: connection.chainSymbol })}
                  name="delegatedBw"
                  onChange={this.onChange}
                />
                <GlobalFormFieldToken
                  connection={connection}
                  defaultValue={delegatedCpu && delegatedCpu.split(' ')[0]}
                  label={t('tools_form_create_account_delegated_cpu_label', { chainSymbol: connection.chainSymbol })}
                  name="delegatedCpu"
                  onChange={this.onChange}
                />
                <Form.Checkbox
                  checked={transferTokens}
                  label={t('tools_form_create_account_transfer')}
                  name="transferTokens"
                  onChange={this.onToggle}
                />
                {(ramPrice && !formErrors.ramAmount) ? (
                  <h4 style={{ margin: '30px' }}>
                    {`${t('tools_form_create_account_ram_price_estimate')} ${ramPrice.toFixed(4)} ${connection.chainSymbol}.`}
                  </h4>
                ) : ''}
                <FormMessageError
                  chainSymbol={connection.chainSymbol}
                  errors={
                    formErrorKeys.length > 0 && formErrorKeys.reduce((errors, key) => {
                      const error = this.state.formErrors[key];
                      if (error) {
                        errors.push(error);
                      }
                      return errors;
                    }, [])
                  }
                  icon="warning sign"
                />
                {(shouldShowtransferTokensWarning)
                  ? (
                    <Message
                      content={t('tools_form_create_account_transfer_tokens_warning')}
                      icon="info circle"
                      warning
                    />
                  ) : ''}
                {(shouldShowAccountNameWarning)
                  ? (
                    <Message
                      content={t('tools_form_create_account_account_name_warning')}
                      icon="info circle"
                      warning
                    />
                  ) : ''}

                {(shouldShowDelegatedResourceWarning)
                  ? (
                    <Message
                      content={t('tools_form_create_account_delegated_resources_warning_message')}
                      icon="info circle"
                      warning
                    />
                  ) : ''}

                {(shouldShowPublicKeysWarning)
                  ? (
                    <Message
                      content={t('tools_form_create_account_public_keys_warning')}
                      icon="info circle"
                      warning
                    />
                  ) : ''}
                <Segment basic clearing>
                  {(!hideCancel)
                    ? (
                      <Button
                        content={t('tools_form_create_account_cancel')}
                        color="grey"
                        onClick={onClose}
                      />
                    ) : ''}

                  <Button
                    content={t('tools_form_create_account_button')}
                    color="green"
                    disabled={submitDisabled}
                    floated="right"
                    primary
                  />
                </Segment>
              </Form>
            </div>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <ToolsFormCreateAccountConfirming
              accountName={accountName}
              activeKeyValue={activeKeyValue}
              connection={connection}
              delegatedBw={delegatedBw}
              delegatedCpu={delegatedCpu}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              ownerKeyValue={ownerKeyValue}
              ramAmount={ramAmount}
              transferTokens={transferTokens}
              totalCost={ramPrice}
              totalDelegated={totalDelegated}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('tools')(ToolsFormCreateAccount);

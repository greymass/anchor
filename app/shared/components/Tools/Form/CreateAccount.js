// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Button, Message } from 'semantic-ui-react';

import GlobalFormFieldRam from '../../Global/Form/Field/Ram';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldKeyPublic from '../../Global/Form/Field/Key/Public';
import FormMessageError from '../../Global/Form/Message/Error';
import ToolsFormCreateAccountConfirming from './CreateAccount/Confirming';
import calculatePriceOfRam from '../../helpers/calculatePriceOfRam';

type Props = {
  actions: {},
  globals: {},
  system: {}
};

const formAttributes = ['accountName', 'activeKey', 'ownerKey', 'delegatedBw', 'delegatedCpu', 'ramAmount'];

class ToolsFormCreateAccount extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);

    const {
      balance
    } = props;

    this.state = {
      confirming: false,
      EOSbalance: (balance && balance.EOS) ? balance.EOS : 0,
      formErrors: {},
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
      actions,
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

  onChange = (e, { name, value, valid }) => {
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
        globals,
        system
      } = this.props;

      const {
        checkAccountAvailability
      } = actions;

      if (name === 'accountName' &&
          accountName.length === 12 &&
          system.ACCOUNT_AVAILABLE_LAST_ACCOUNT !== accountName) {
        checkAccountAvailability(accountName);
      }

      if (name === 'ramAmount') {
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
      EOSbalance,
      ramAmount,
      ramPrice
    } = this.state;

    const formErrors = errors;
    let submitDisabled = disabled;

    formAttributes.forEach((attribute) => {
      formErrors[attribute] = null;
    });

    if (Number(ramAmount) < 3100) {
      formErrors.ramAmount = 'not_enough_ram_for_new_account';
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

    const decimalBalance = Decimal(EOSbalance);
    const decimalDelegatedBw = Decimal(delegatedBw.split(' ')[0]);
    const decimalDelegatedCpu = Decimal(delegatedCpu.split(' ')[0]);

    const decimalDelegatedResources = decimalDelegatedBw.plus(decimalDelegatedCpu);

    if (ramPrice.plus(decimalDelegatedResources).greaterThan(decimalBalance)) {
      if (delegatedBw > 1) {
        formErrors.delegatedBw = 'not_enough_balance';
      } else if (delegatedCpu > 1) {
        formErrors.delegatedCpu = 'not_enough_balance';
      } else {
        formErrors.ramAmount = 'not_enough_balance';
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
      activeKey,
      delegatedBw,
      delegatedCpu,
      ownerKey,
      ramAmount
    } = this.state;

    createAccount(
      accountName,
      activeKey,
      delegatedBw,
      delegatedCpu,
      ownerKey,
      ramAmount
    );
  }

  render() {
    const {
      hideCancel,
      onClose,
      system,
      t
    } = this.props;

    const {
      accountName,
      activeKey,
      delegatedBw,
      delegatedCpu,
      ownerKey,
      ramAmount,
      ramPrice
    } = this.state;

    let {
      formErrors,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    if (accountName &&
        accountName.length === 12 &&
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

    let totalCost;

    if (decimalDelegatedBw && decimalDelegatedCpu && ramAmount) {
      totalCost = decimalDelegatedBw.plus(decimalDelegatedCpu).plus(ramPrice);
    }

    const shouldShowAccountNameWarning = accountName && accountName.length !== 12;

    const shouldShowDelegatedResourceWarning =
      (decimalDelegatedBw &&
        decimalDelegatedBw.lessThan(1) &&
        decimalDelegatedBw.greaterThan(0)) ||
      (decimalDelegatedCpu &&
        decimalDelegatedCpu.lessThan(1) &&
        decimalDelegatedCpu.greaterThan(0));

    return (
      <Segment
        loading={system.CREATEACCOUNT === 'PENDING'}
      >
        {(shouldShowForm)
          ? (
            <div>
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <GlobalFormFieldKeyPublic
                  defaultValue={ownerKey || ''}
                  label={t('tools_form_create_account_owner_key')}
                  name="ownerKey"
                  onChange={this.onChange}
                />
                <GlobalFormFieldKeyPublic
                  defaultValue={activeKey || ''}
                  label={t('tools_form_create_account_active_key')}
                  name="activeKey"
                  onChange={this.onChange}
                />
                <GlobalFormFieldAccount
                  value={accountName || ''}
                  label={t('tools_form_create_account_account_name')}
                  name="accountName"
                  onChange={this.onChange}
                />
                <GlobalFormFieldRam
                  defaultValue={ramAmount || ''}
                  label={t('tools_form_create_account_ram_amount')}
                  name="ramAmount"
                  onChange={this.onChange}
                />
                <GlobalFormFieldToken
                  defaultValue={delegatedBw && delegatedBw.split(' ')[0]}
                  label={t('tools_form_create_account_delegated_bw')}
                  name="delegatedBw"
                  onChange={this.onChange}
                />
                <GlobalFormFieldToken
                  defaultValue={delegatedCpu && delegatedCpu.split(' ')[0]}
                  label={t('tools_form_create_account_delegated_cpu')}
                  name="delegatedCpu"
                  onChange={this.onChange}
                />
                <FormMessageError
                  errors={
                    formErrorKeys.length > 0 && formErrorKeys.reduce((errors, key) => {
                      const error = this.state.formErrors[key];
                      if (error) {
                        errors.push(error);
                      }
                      return errors;
                    }, [])
                  }
                />
                {(shouldShowAccountNameWarning)
                  ? (
                    <Message info>
                      {t('tools_form_create_account_account_name_warning')}
                    </Message>
                  ) : ''}

                {(shouldShowDelegatedResourceWarning)
                  ? (
                    <Message info>
                      {t('tools_form_create_account_delegated_resources_warning')}
                    </Message>
                  ) : ''}
                <Divider />
                <div style={{ height: '35px' }}>
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
                </div>
              </Form>
            </div>
          ) : ''}

        {(shouldShowConfirm)
          ? (
            <ToolsFormCreateAccountConfirming
              accountName={accountName}
              activeKey={activeKey}
              delegatedBw={delegatedBw}
              delegatedCpu={delegatedCpu}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              ownerKey={ownerKey}
              ramAmount={ramAmount}
              totalCost={totalCost}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('tools')(ToolsFormCreateAccount);

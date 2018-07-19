// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import { Segment, Form, Divider, Button } from 'semantic-ui-react';

import GlobalFormFieldRam from '../../Global/Form/Field/Ram';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldKeyPublic from '../../Global/Form/Field/Key/Public';
import FormMessageError from '../../Global/Form/Message/Error';
import ToolsFormCreateAccountConfirming from './CreateAccount/Confirming';
import calculatePriceOfRam from '../../helpers/calculatePriceOfRam';

type Props = {
  actions: {},
  account: {},
  system: {}
};

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
        formErrors
      } = this.state;

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
        submitDisabled
      });
    });
  }

  allFieldsHaveValidFormat = () => {
    const {
      accountName,
      formErrors,
      publicKey,
      ramAmount,
      delegatedResources
    } = this.state;

    if (!accountName || formErrors.accountName === 'invalid_accountName') {
      return false;
    }

    if (!publicKey || formErrors.publicKey === 'invalid_publicKey') {
      return false;
    }

    if (!ramAmount || formErrors.ramAmount === 'invalid_ramAmount') {
      return false;
    }

    if (!delegatedResources || formErrors.delegatedResources === 'invalid_startingBalance') {
      return false;
    }

    return true;
  }

  errorsInForm = (errors, disabled) => {
    const {
      globals
    } = this.props;

    const {
      accountName,
      delegatedResources,
      EOSbalance,
      ramAmount
    } = this.state;

    const formErrors = errors;
    let submitDisabled = disabled;

    formErrors.accountName = null;
    formErrors.ramAmount = null;
    formErrors.delegatedResources = null;

    if (false) {
      formErrors.accountName = 'account_name_not_available';
      submitDisabled = true;
    }

    if (Number(ramAmount) < 3000) {
      formErrors.ramAmount = 'not_enough_ram_for_new_account';
      submitDisabled = true;
    }

    const decBaseBal = Decimal(globals.ram.base_balance);
    const decQuoteBal = Decimal(globals.ram.quote_balance);

    const ramPrice = calculatePriceOfRam(decBaseBal, decQuoteBal, Decimal(ramAmount));

    const decimalBalance = Decimal(EOSbalance);
    const decimalDelegatedResources = Decimal(delegatedResources.split(' ')[0]);

    if (ramPrice.plus(decimalDelegatedResources).greaterThan(decimalBalance)) {
      if (delegatedResources > 2) {
        formErrors.delegatedResources = 'not_enough_balance';
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
      delegatedResources,
      publicKey,
      ramAmount
    } = this.state;

    createAccount(accountName, publicKey, ramAmount, delegatedResources);
  }

  render() {
    const {
      account,
      balance,
      onClose,
      system,
      t
    } = this.props;

    const {
      accountName,
      delegatedResources,
      publicKey,
      ramAmount,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

    const formErrorKeys = Object.keys(this.state.formErrors);

    return (
      <Segment
        loading={system.STAKE === 'PENDING'}
        style={{ minHeight: '100px' }}
      >
        {(shouldShowForm)
          ? (
            <div>
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <Form.Group widths="equal">
                  <GlobalFormFieldAccount
                    defaultValue={accountName || ''}
                    label={t('tools_form_create_account_account_name')}
                    name="accountName"
                    onChange={this.onChange}
                  />
                  <GlobalFormFieldKeyPublic
                    defaultValue={publicKey || ''}
                    label={t('tools_form_create_account_public_key')}
                    name="publicKey"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <GlobalFormFieldRam
                    defaultValue={ramAmount || ''}
                    label={t('tools_form_create_account_ram_amount')}
                    name="ramAmount"
                    onChange={this.onChange}
                  />
                  <GlobalFormFieldToken
                    defaultValue={delegatedResources && delegatedResources.split(' ')[0]}
                    label={t('tools_form_create_account_delegated_resources')}
                    name="delegatedResources"
                    onChange={this.onChange}
                  />
                </Form.Group>
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
                <Divider />
                <Button
                  content={t('tools_form_create_account_cancel')}
                  color="grey"
                  onClick={onClose}
                />
                <Button
                  content={t('tools_form_create_account_button')}
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
            <ToolsFormCreateAccountConfirming
              accountName={accountName}
              balance={balance}
              delegatedResources={delegatedResources}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              publicKey={publicKey}
              ramAmount={ramAmount}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('tools')(ToolsFormCreateAccount);

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
  balance: {},
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

      if (!valid) {
        formErrors[name] = `invalid_${name}`;
      } else if (this.allFieldsHaveValidFormat()) {
        formErrors = this.errorsInForm(formErrors);
      }

      this.setState({
        formErrors,
        submitDisabled: Object.keys(formErrors).length !== 0
      });
    });
  }

  allFieldsHaveValidFormat = () => {
    const {
      accountName,
      formErrors,
      publicKey,
      ramAmount,
      startingBalance
    } = this.state;

    if (!accountName || formErrors.accountName === 'invalid_account_name') {
      return false;
    }

    if (!publicKey || formErrors.publicKey === 'invalid_public_key') {
      return false;
    }

    if (!ramAmount || formErrors.ramAmount === 'invalid_ram_amount') {
      return false;
    }

    if (!startingBalance || formErrors.startingBalance === 'invalid_starting_balance') {
      return false;
    }

    return true;
  }

  errorsInForm = (errors) => {
    const errorsInForm = errors;

    const {
      accountName,
      EOSbalance,
      ramAmount,
      startingBalance
    } = this.state;

    if (false) {
      errorsInForm.accountName = 'account_name_not_available';
    }

    if (ramAmount < 3000) {
      errorsInForm.ramAmount = 'not_enough_ram_for_new_account';
    }

    const ramPrice = calculatePriceOfRam(ramAmount);

    if (Decimal(ramPrice).plus(Decimal(startingBalance)).greaterThan(EOSbalance)) {
      if (startingBalance > 0) {
        errorsInForm.startingBalance = 'not_enough_balance';
      } else {
        errorsInForm.ramAmount = 'not_enough_balance';
      }
    }

    return errorsInForm;
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
      publicKey,
      ramAmount,
      startingBalance
    } = this.state;

    createAccount(accountName, publicKey, ramAmount, startingBalance);
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
      publicKey,
      ramAmount,
      startingBalance,
      submitDisabled
    } = this.state;

    const shouldShowConfirm = this.state.confirming;
    const shouldShowForm = !shouldShowConfirm;

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
                    defaultValue={accountName}
                    label={t('tools_form_create_account_account_name')}
                    name="accountName"
                    onChange={this.onChange}
                  />
                  <GlobalFormFieldKeyPublic
                    defaultValue={publicKey}
                    label={t('tools_form_create_account_public_key')}
                    name="publicKey"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <Form.Group widths="equal">
                  <GlobalFormFieldRam
                    defaultValue={ramAmount}
                    label={t('tools_form_create_account_ram_amount')}
                    name="ramAmount"
                    onChange={this.onChange}
                  />
                  <GlobalFormFieldToken
                    defaultValue={startingBalance}
                    label={t('tools_form_create_account_starting_balance')}
                    name="startingBalance"
                    onChange={this.onChange}
                  />
                </Form.Group>
                <FormMessageError
                  error={
                    Object.keys(this.state.formErrors).map((key) => {
                      return this.state.formErrors[key];
                    }).join('\n')
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
              account={account}
              balance={balance}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
            />
          ) : ''}
      </Segment>
    );
  }
}


export default translate('tools')(ToolsFormCreateAccount);

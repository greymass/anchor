// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';
import debounce from 'lodash/debounce';

import { Segment, Form, Button, Message } from 'semantic-ui-react';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../Global/Form/Field/Generic';
import FormMessageError from '../../Global/Form/Message/Error';
import ToolsFormProxyInfoConfirming from './ProxyInfo/Confirming';

const formAttributes = [
  'proxy', 'name', 'slogan', 'philosophy', 'background', 'website', 'logo_256', 'telegram', 'steemit', 'twitter', 'wechat'
];

class ToolsFormProxyInfo extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      accountName,
      activeKey,
      balance,
      delegatedBw,
      delegatedCpu,
      ownerKey,
      ramAmount
    } = props;

    this.state = {
      accountName,
      activeKey,
      confirming: false,
      delegatedBw,
      delegatedCpu,
      EOSbalance: (balance && balance.EOS) ? balance.EOS : 0,
      formErrors: {},
      ownerKey,
      ramAmount,
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
        checkAccountExists
      } = actions;

      if (name === 'accountName' && accountName.length !== 0) {
        checkAccountExists(accountName);
      }

      let submitDisabled = false;

      if (!valid) {
        formErrors[name] = `invalid_${name}`;
      } else {
        formErrors[name] = null;
      }

      if (!this.allFieldsHaveValidFormat()) {
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

    formAttributes.splice(0, 1).forEach((attribute) => {
      if (!this.state[attribute] || formErrors[attribute] === `invalid_${attribute}`) {
        validFormat = false;
      }
    });

    return validFormat;
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

    const formValues = formAttributes.map((formAttribute) => {
      this.state[formAttribute]
    });

    actions.buildTransaction(
      'regproxyinfo',
      'set',
      settings.account,
      formValues
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
      contacts,
      delegatedBw,
      delegatedCpu,
      formErrors,
      ownerKey,
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

    const shouldShowPublicKeysWarning = activeKey && activeKey === ownerKey;

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
                <GlobalFormFieldAccount
                  defaultValue={proxy || ''}
                  label={t('tools_form_create_account_owner_key')}
                  name="ownerKey"
                  onChange={this.onChange}
                />
                {formAttributes.map((formAttribute) => {}
                  <GlobalFormFieldGeneric
                    defaultValue={this.state[formAttribute] || ''}
                    label={t('tools_form_create_account_owner_key')}
                    name={formAttribute}
                    onChange={this.onChange}
                  />
                })}
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
                      content={t('tools_form_create_account_delegated_resources_warning')}
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
            <ToolsFormProxyInfoConfirming
              accountName={accountName}
              activeKey={activeKey}
              delegatedBw={delegatedBw}
              delegatedCpu={delegatedCpu}
              onBack={this.onBack}
              onConfirm={this.onConfirm}
              ownerKey={ownerKey}
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


export default translate('tools')(ToolsFormProxyInfo);

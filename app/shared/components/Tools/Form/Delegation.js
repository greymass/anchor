// @flow
import React, { Component } from 'react';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { translate } from 'react-i18next';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormMessageError from '../../Global/Form/Message/Error';

import ToolsFormDelegationConfirming from './Delegation/Confirming';

class ToolsFormDelegation extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      accountName: null,
      accountNameValid: true,
      cpuAmount: null,
      cpuAmountValid: true,
      netAmount: null,
      netAmountValid: true,
      formError: false,
      label: null,
      submitDisabled: true
    };
  }

  componentWillMount() {
    const {
      delegationToEdit,
      delegationToRemove
    } = this.props;

    if (delegationToEdit) {
      const {
        accountName,
        cpuAmount,
        netAmount
      } = delegationToEdit;

      this.setState({
        accountName,
        cpuAmount,
        netAmount
      });
    } else if (delegationToRemove) {
      const {
        accountName
      } = delegationToEdit;

      this.setState({
        accountName,
        confirming: true,
        cpuAmount: 0,
        netAmount: 0
      });
    }
  }

  onChange = (e, { name, value, valid }) => {
    this.setState({
      formError: null,
      submitDisabled: false,
      [`${name}Valid`]: valid,
      [name]: value
    }, () => {
      const error = this.errorInForm();

      if (error) {
        let formError;

        if (error !== true) {
          formError = error;
        }
        this.setState({
          formError,
          submitDisabled: true
        });
      }
    });
  }

  errorInForm = () => {
    const {
      accountName,
      accountNameValid,
      cpuAmount,
      cpuAmountValid,
      netAmount,
      netAmountValid
    } = this.state;

    if (!accountName || accountName.length === 0) {
      return true;
    }

    if (!accountNameValid) {
      return 'invalid_accountName';
    }

    if (!cpuAmount) {
      return true;
    }

    if (!cpuAmountValid) {
      return 'invalid_cpuAmount';
    }

    if (!netAmount) {
      return true;
    }

    if (!netAmountValid) {
      return 'invalid_accountName';
    }

    return false;
  }

  onSubmit = () => {
    const {
      actions,
      contacts,
      onSuccess
    } = this.props;

    const {
      accountName,
      cpuAmount,
      netAmount
    } = this.state;

    const {
      setStake
    } = actions;

    setStake(accountName, netAmount, cpuAmount);
  }

  render() {
    const {
      skipForm,
      contacts,
      onClose,
      t
    } = this.props;

    const {
      accountName,
      cpuAmount,
      confirming,
      netAmount,
      formError,
      submitDisabled
    } = this.state;

    return (
      <div>
        {(confirming)
          ? (
            <ToolsFormDelegationConfirming
              accountName={accountName}
              cpuAmount={cpuAmount}
              netAmount={netAmount}
            />
          ) : (
            <Form
              onKeyPress={this.onKeyPress}
              onSubmit={this.onSubmit}
            >
              <GlobalFormFieldAccount
                contacts={contacts}
                label={t('tools_form_contact_account_name')}
                name="accountName"
                onChange={this.onChange}
                value={accountName || ''}
              />
              <GlobalFormFieldToken
                value={cpuAmount || ''}
                label={t('tools_form_contact_label')}
                name="label"
                onChange={this.onChange}
              />
              <GlobalFormFieldToken
                value={netAmount || ''}
                label={t('tools_form_contact_label')}
                name="label"
                onChange={this.onChange}
              />

              <GlobalFormMessageError
                error={formError}
                icon="warning sign"
              />

              <Segment basic clearing>
                <Button
                  content={t('tools_form_contact_submit')}
                  color="green"
                  disabled={submitDisabled}
                  floated="right"
                  primary
                />
                <Button
                  onClick={onClose}
                >
                  <Icon name="x" /> {t('tools_form_contact_cancel')}
                </Button>
              </Segment>
            </Form>
          )}
      </div>
    );
  }
}

export default translate('tools')(ToolsFormDelegation);

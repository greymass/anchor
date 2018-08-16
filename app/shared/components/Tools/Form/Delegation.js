// @flow
import React, { Component } from 'react';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { Decimal } from 'decimal.js';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldToken from '../../Global/Form/Field/Token';
import GlobalFormMessageError from '../../Global/Form/Message/Error';

import ToolsFormDelegationConfirming from './Delegation/Confirming';
import WalletPanelLocked from '../../Wallet/Panel/Locked';

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
      submitDisabled: true
    };
  }

  componentWillMount() {
    const {
      delegationToEdit,
      delegationToRemove,
      skipForm
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
        confirming: skipForm || false,
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

  onConfirm = () => {
    const {
      actions
    } = this.props;

    const {
      accountName,
      cpuAmount,
      netAmount
    } = this.state;

    const {
      setStake
    } = actions;

    this.setState({
      confirming: false
    }, () => {
      setStake(
        accountName,
        Decimal(netAmount.split(' ')[0]),
        Decimal(cpuAmount.split(' ')[0])
      );
    });
  }

  onSubmit = () => {
    this.setState({
      confirming: true
    });
  }

  onBack = () => {
    this.setState({
      confirming: false
    });
  }

  render() {
    const {
      actions,
      contacts,
      keys,
      onClose,
      settings,
      system,
      t,
      validate,
      wallet
    } = this.props;

    const {
      accountName,
      cpuAmount,
      confirming,
      netAmount,
      formError,
      submitDisabled
    } = this.state;

    return ((keys && keys.key) || settings.walletMode === 'watch')
      ? (
        <Segment
          loading={system.STAKE === 'PENDING'}
        >
          {(confirming)
            ? (
              <ToolsFormDelegationConfirming
                accountName={accountName}
                cpuAmount={cpuAmount}
                netAmount={netAmount}
                onConfirm={this.onConfirm}
                onBack={this.onBack}
              />
            ) : (
              <Form
                onKeyPress={this.onKeyPress}
                onSubmit={this.onSubmit}
              >
                <GlobalFormFieldAccount
                  contacts={contacts}
                  label={t('tools_form_delegation_account_name')}
                  name="accountName"
                  onChange={this.onChange}
                  value={accountName || ''}
                />
                <GlobalFormFieldToken
                  defaultValue={(cpuAmount && cpuAmount.split(' ')[0]) || ''}
                  label={t('tools_form_delegation_cpu_amount')}
                  name="cpuAmount"
                  onChange={this.onChange}
                />
                <GlobalFormFieldToken
                  defaultValue={(netAmount && netAmount.split(' ')[0]) || ''}
                  label={t('tools_form_contact_net_amount')}
                  name="netAmount"
                  onChange={this.onChange}
                />

                <GlobalFormMessageError
                  error={formError}
                  icon="warning sign"
                />

                <Segment basic clearing>
                  <Button
                    content={t('tools_form_delegation_submit')}
                    color="green"
                    disabled={submitDisabled}
                    floated="right"
                    primary
                  />
                  <Button
                    onClick={onClose}
                  >
                    <Icon name="x" /> {t('tools_form_delegation_cancel')}
                  </Button>
                </Segment>
              </Form>
            )}
        </Segment>
      ) : (
        <WalletPanelLocked
          actions={actions}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
      );
  }
}

export default translate('tools')(ToolsFormDelegation);

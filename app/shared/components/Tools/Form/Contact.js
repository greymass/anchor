// @flow
import React, { Component } from 'react';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import { findIndex } from 'lodash';

import GlobalFormFieldAccount from '../../Global/Form/Field/Account';
import GlobalFormFieldGeneric from '../../Global/Form/Field/Generic';
import GlobalFormFieldMemo from '../../Global/Form/Field/Memo';
import GlobalFormMessageError from '../../Global/Form/Message/Error';

class ToolsFormContact extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      formError: false,
      submitDisabled: false,
      defaultMemo: null,
      defaultMemoValid: true,
      fullName: null,
      accountName: null,
      accountNameValid: true
    };
  }

  componentWillMount() {
    const {
      contactToEdit
    } = this.props;

    if (contactToEdit) {
      const {
        accountName,
        defaultMemo,
        fullName
      } = contactToEdit;

      this.setState({
        accountName,
        defaultMemo,
        fullName
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
      contacts,
      contactToEdit,
    } = this.props;

    const {
      accountName,
      accountNameValid,
      defaultMemoValid,
      fullName
    } = this.state;

    if (!fullName || fullName.length === 0) {
      return 'needed_full_name';
    }

    if (!defaultMemoValid) {
      return 'invalid_default_memo';
    }

    if (!fullName || fullName.length === 0) {
      return true;
    }

    if (!accountNameValid) {
      return 'invalid_accountName';
    }

    const accountNameHasChanged = !contactToEdit || contactToEdit.accountName !== accountName;
    const accountNameIsInList = findIndex(contacts, { accountName }) > -1;

    if (accountNameHasChanged && accountNameIsInList) {
      return 'accountName_not_unique';
    }

    return false;
  }

  onSubmit = () => {
    const {
      actions,
      contactToEdit,
      contacts,
      deleteContact,
      onSuccess
    } = this.props;

    const {
      accountName,
      defaultMemo,
      fullName
    } = this.state;

    if (contactToEdit) {
      deleteContact(contactToEdit);
    }

    actions.setSetting(
      'contacts',
      contacts.concat({
        accountName,
        defaultMemo,
        fullName
      })
    );

    this.setState({
      accountName: null,
      defaultMemo: null,
      fullName: null
    }, () => {
      onSuccess((contactToEdit) ? 'tools_contacts_success_edit' : null);
    });
  }

  render() {
    const {
      onClose,
      contactToEdit,
      t
    } = this.props;

    const contact = contactToEdit || {};

    const {
      accountName,
      defaultMemo,
      formError,
      fullName,
      submitDisabled
    } = this.state;

    return (
      <Form
        onKeyPress={this.onKeyPress}
        onSubmit={this.onSubmit}
      >
        <GlobalFormFieldAccount
          value={accountName || ''}
          label={t('tools_form_contact_account_name')}
          name="accountName"
          offerOptions={false}
          onChange={this.onChange}
        />
        <GlobalFormFieldGeneric
          value={fullName || ''}
          label={t('tools_form_contact_full_name')}
          name="fullName"
          onChange={this.onChange}
        />
        <GlobalFormFieldMemo
          value={defaultMemo || ''}
          label={t('tools_form_contact_memo')}
          name="defaultMemo"
          onChange={this.onChange}
        />

        <GlobalFormMessageError
          error={formError}
          icon="warning sign"
        />

        <Segment basic clearing>
          <Button
            content={t('tools_form_contact_button')}
            color="green"
            disabled={submitDisabled}
            floated="right"
            primary
          />
          <Button
            onClick={onClose}
          >
            <Icon name="x" /> {t('cancel')}
          </Button>
        </Segment>
      </Form>
    );
  }
}

export default translate('tools')(ToolsFormContact);

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
      accountName: null,
      accountNameValid: true,
      defaultMemo: null,
      defaultMemoValid: true,
      formError: false,
      label: null,
      submitDisabled: true
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
        label
      } = contactToEdit;

      this.setState({
        accountName,
        defaultMemo,
        label,
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
      defaultMemoValid
    } = this.state;

    if (!defaultMemoValid) {
      return 'invalid_memo';
    }

    if (!accountName || accountName.length === 0) {
      return true;
    }

    if (!accountNameValid) {
      return 'invalid_accountName';
    }

    const accountNameHasChanged = !contactToEdit || contactToEdit.accountName !== accountName;
    const accountNameIsInList = findIndex(contacts, { accountName }) > -1;

    if (accountNameHasChanged && accountNameIsInList) {
      return 'accountName_not_unique_in_contacts';
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
      label
    } = this.state;

    if (contactToEdit) {
      deleteContact(contactToEdit);
    }

    actions.setSetting(
      'contacts',
      contacts.concat({
        accountName,
        defaultMemo,
        label
      })
    );

    this.setState({
      accountName: null,
      defaultMemo: null,
      label: null
    }, () => {
      onSuccess((contactToEdit) ? 'tools_contacts_success_edit' : null);
    });
  }

  render() {
    const {
      contacts,
      onClose,
      t
    } = this.props;

    const {
      accountName,
      defaultMemo,
      formError,
      label,
      submitDisabled
    } = this.state;

    return (
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
        <GlobalFormFieldGeneric
          value={label || ''}
          label={t('tools_form_contact_label')}
          name="label"
          onChange={this.onChange}
        />
        <GlobalFormFieldMemo
          value={defaultMemo || ''}
          label={t('tools_form_contact_default_memo')}
          name="defaultMemo"
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
    );
  }
}

export default translate('tools')(ToolsFormContact);

// @flow
import React, { Component } from 'react';
import { Segment, Form, Button, Icon } from 'semantic-ui-react';
import { translate } from 'react-i18next';

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

  onChange = (e, { name, value, valid }) => {
    this.setState({
      formError: null,
      submitDisabled: false,
      [`${name}Valid`]: valid,
      [name]: value
    }, () => {
      const formError = this.errorInForm();

      if (formError) {
        this.setState({
          formError,
          submitDisabled: true
        });
      }
    });
  }

  errorsInForm = () => {
    const {
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

    if (!accountNameValid) {
      return 'invalid_accountName';
    }

    return false;
  }

  onSubmit = () => {
    const {
      actions,
      contacts
    } = this.props;

    const {
      accountName,
      defaultMemo,
      fullName
    } = this.state;

    actions.setSetting(
      'contacts',
      contacts.concat({
        accountName,
        defaultMemo,
        fullName
      })
    );
  }

  render() {
    const {
      onClose,
      t
    } = this.props;

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
          defaultValue={accountName || ''}
          label={t('tools_form_contact_account_name')}
          name="accountName"
          offerOptions={false}
          onChange={this.onChange}
        />
        <GlobalFormFieldGeneric
          defaultValue={fullName || ''}
          label={t('tools_form_contact_full_name')}
          name="fullName"
          onChange={this.onChange}
        />
        <GlobalFormFieldMemo
          defaultValue={defaultMemo || ''}
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

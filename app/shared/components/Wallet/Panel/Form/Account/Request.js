// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Container, Form, Message } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

import GlobalFormFieldAccount from '../../../../Global/Form/Field/Account';
import GlobalFormFieldKeyPublic from '../../../../Global/Form/Field/Key/Public';
import FormMessageError from '../../../../Global/Form/Message/Error';

class WalletPanelFormAccountRequest extends Component<Props> {
  onSubmit = () => this.props.onSubmit()
  render() {
    const {
      error,
      isValid,
      onChange,
      setPrivateKey,
      shouldShowAccountNameWarning,
      t,
      values
    } = this.props;
    return (
      <Form
        warning={shouldShowAccountNameWarning}
        onSubmit={this.onSubmit}
      >
        <Header>
          {t('wallet_account_request_form_header')}
          <Header.Subheader>
            {t('wallet_account_request_form_subheader')}
          </Header.Subheader>
        </Header>
        <GlobalFormFieldAccount
          autofocus
          label={t('tools:tools_form_create_account_account_name')}
          name="accountName"
          onChange={debounce(onChange, 300)}
          value={values.accountName}
        />
        <GlobalFormFieldKeyPublic
          defaultValue={values.owner}
          generate
          label={t('tools:tools_form_create_account_owner_key')}
          name="owner"
          onChange={onChange}
          setPrivateKey={setPrivateKey}
        />
        <GlobalFormFieldKeyPublic
          defaultValue={values.active}
          generate
          label={t('tools:tools_form_create_account_active_key')}
          name="active"
          onChange={onChange}
          setPrivateKey={setPrivateKey}
        />
        <FormMessageError
          error={error}
          icon="warning sign"
          style={{ margin: '1em 0' }}
        />
        {(shouldShowAccountNameWarning)
          ? (
            <Message
              content={t('tools:tools_form_create_account_account_name_warning')}
              icon="info circle"
              warning
            />
          ) : ''}
        <Container textAlign="right">
          <Form.Button
            color="blue"
            content={t('next')}
            disabled={!isValid}
          />
        </Container>
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormAccountRequest);

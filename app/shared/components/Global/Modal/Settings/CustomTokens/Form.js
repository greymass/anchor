// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Container, Form, Input } from 'semantic-ui-react';

class GlobalModalSettingsCustomTokensForm extends Component<Props> {
  render() {
    const {
      loading,
      onChange,
      onSubmit,
      ref,
      t,
      values
    } = this.props;
    const {
      account,
      symbol,
    } = values;
    return (
      <Form
        loading={loading}
        onSubmit={onSubmit}
        ref={ref}
      >
        <Form.Field
          autoFocus
          control={Input}
          fluid
          label={t('global_modal_settings_customtoken_form_account_label')}
          name="account"
          onChange={onChange}
          placeholder={t('global_modal_settings_customtoken_form_account_placeholder')}
          type="text"
          value={account}
        />
        <Form.Field
          control={Input}
          fluid
          label={t('global_modal_settings_customtoken_form_symbol_label')}
          name="symbol"
          onChange={onChange}
          placeholder={t('global_modal_settings_customtoken_form_symbol_placeholder')}
          type="text"
          value={symbol}
        />
        <Container textAlign="center">
          <Button
            color="green"
            content={t('global_modal_settings_customtoken_add')}
          />
        </Container>
      </Form>
    );
  }
}

export default translate('global')(GlobalModalSettingsCustomTokensForm);

// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

export default class WalletPanelKey extends Component<Props> {
  render() {
    const {
      onChange,
      validate,
      value
    } = this.props;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Form.Field
              control={Input}
              fluid
              icon={(validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS' && validate.KEY === 'SUCCESS') ? 'checkmark' : 'x'}
              label={t('wallet_panel_form_key')}
              loading={(validate.KEY === 'PENDING')}
              name="key"
              onChange={onChange}
              defaultValue={value}
              type="password"
            />
          )
        }
      </I18n>
    );
  }
}

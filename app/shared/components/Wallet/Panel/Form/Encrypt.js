// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

export default class WalletPanelFormEncrypt extends Component<Props> {
  render() {
    const {
      encryptWallet,
      onChange,
      onToggle
    } = this.props;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              <Form.Checkbox
                checked={encryptWallet}
                label={t('wallet_panel_form_encrypt_wallet')}
                name="encryptWallet"
                onChange={onToggle}
                value={encryptWallet ? 'on' : 'off'}
              />
              { encryptWallet
                ? (
                  <Form.Field
                    control={Input}
                    fluid
                    icon="lock"
                    label={t('wallet_panel_password_label')}
                    name="password"
                    type="password"
                    onChange={onChange}
                  />
                )
                : null
              }
            </div>
          )
        }
      </I18n>
    );
  }
}

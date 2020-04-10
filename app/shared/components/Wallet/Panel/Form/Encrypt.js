// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Form, Input } from 'semantic-ui-react';

class WalletPanelFormEncrypt extends Component<Props> {
  render() {
    const {
      encryptWallet,
      onChange,
      onToggle,
      t,
    } = this.props;
    return (
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
    );
  }
}

export default withTranslation('wallet')(WalletPanelFormEncrypt);

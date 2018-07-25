// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Form, Header, Input } from 'semantic-ui-react';

import WalletPanelFormModalConfirm from '../../../../../Wallet/Panel/Form/Modal/Confirm';

import { encrypt } from '../../../../../../actions/wallet';

const { ipcRenderer } = require('electron');

class WalletPanelModalAccountRequestBackup extends Component<Props> {
  state = { visible: false };
  onToggleVisible = () => this.setState({ visible: !this.state.visible });
  promptSave = () => {
    const {
      keys,
      onSubmit,
      values
    } = this.props;
    const { password } = values;
    const data = JSON.stringify(Object.values(keys), null, 2);
    const encrypted = encrypt(data, password);
    ipcRenderer.send('saveFile', encrypted, 'backup');
    if (onSubmit) onSubmit();
  }
  render() {
    const {
      confirming,
      onBack,
      onCancel,
      onChange,
      onConfirm,
      t,
      values
    } = this.props;
    const { visible } = this.state;
    return (
      <Form>
        <Header>
          {t('wallet_account_request_backup_header')}
          <Header.Subheader>
            {t('wallet_account_request_backup_subheader')}
          </Header.Subheader>
        </Header>
        <p>
          {t('wallet_account_request_backup_instructions')}
        </p>
        <Form.Field
          autoFocus
          control={Input}
          fluid
          icon="lock"
          label={t('wallet_account_request_encrypt_password')}
          name="password"
          onChange={onChange}
          type={(visible) ? 'text' : 'password'}
        />
        <Form.Checkbox
          label={t('wallet_account_request_encrypt_password_visible')}
          onChange={this.onToggleVisible}
          checked={visible}
        />
        <WalletPanelFormModalConfirm
          button={(
            <Button
              color="purple"
              content={t('wallet_account_request_encrypt_backup')}
              disabled={!values.password}
              floated="right"
              onClick={onConfirm}
              size="small"
            />
          )}
          open={confirming}
          onCancel={onCancel}
          onConfirm={onConfirm}
          onSubmit={this.promptSave}
          password={values.password}
        />
        <Button
          content={t('back')}
          onClick={onBack}
          size="small"
        />
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelModalAccountRequestBackup);

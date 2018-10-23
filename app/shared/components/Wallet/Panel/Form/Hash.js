// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Form } from 'semantic-ui-react';

import WalletPanelFormModalConfirm from './Modal/Confirm';

class WalletPanelFormHash extends Component<Props> {
  state = {
    confirming: false,
    password: false
  }
  onCancel = () => this.setState({ confirming: false });
  onChange = (e, { name, value }) => this.setState({ [name]: value });
  onComplete = () => {
    const { actions } = this.props;
    const { password } = this.state;
    actions.setWalletHash(password);
  }
  onConfirm = () => this.setState({ confirming: true });
  render() {
    const {
      t,
    } = this.props;
    const {
      confirming,
      password
    } = this.state;
    return (
      <Form>
        <Form.Field
          autoFocus
          control={Form.Input}
          fluid
          key="password"
          icon="lock"
          label={t('wallet_panel_password_label')}
          name="password"
          type="password"
          onChange={this.onChange}
        />
        <WalletPanelFormModalConfirm
          buttonText={t('wallet_panel_hash_button')}
          disabled={!password}
          open={confirming}
          onCancel={this.onCancel}
          onConfirm={this.onConfirm}
          onSubmit={this.onComplete}
          password={password}
        />
      </Form>
    );
  }
}

export default translate('wallet')(WalletPanelFormHash);

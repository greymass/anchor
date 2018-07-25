// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';

class WalletPanelModalAccountRequestImport extends Component<Props> {
  state = {
    importAccount: true
  };
  importData = () => {
    const {
      actions,
      history,
      keys,
      values
    } = this.props;
    actions.importWallet(values.accountName, keys.active, values.password, 'wait');
    actions.setSetting('account', values.accountName);
    actions.setSetting('walletInit', true);
    actions.setWalletKey(keys.active, values.password, 'wait');
    actions.setWalletMode('wait');
    this.props.onClose();
    history.push('/voter');
  }
  onToggleImport = () => this.setState({ importAccount: !this.state.importAccount });
  render() {
    const {
      keys,
      onBack,
      t,
      values,
    } = this.props;
    const {
      importAccount
    } = this.state;
    return (
      <Segment>
        <Header>
          {t('wallet_account_request_import_header')}
          <Header.Subheader>
            {t('wallet_account_request_import_subheader')}
          </Header.Subheader>
        </Header>
        <p>
          {t('wallet_account_request_import_instructions')}
        </p>
        <Form>
          <Form.Checkbox
            checked={importAccount}
            label={t('wallet_account_request_import_toggle')}
            onChange={this.onToggleImport}
          />
        </Form>
        <Divider hidden />
        <Button
          color="blue"
          content={t('wallet_account_request_import_button')}
          disabled={!importAccount}
          floated="right"
          onClick={this.importData}
          size="small"
        />
        <Button
          content={t('back')}
          onClick={onBack}
          size="small"
        />
      </Segment>
    );
  }
}

export default translate('wallet')(WalletPanelModalAccountRequestImport);

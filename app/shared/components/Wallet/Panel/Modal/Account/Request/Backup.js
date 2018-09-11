// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Form, Header, Segment, Message } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

import WalletPanelFormModalConfirm from '../../../../../Wallet/Panel/Form/Modal/Confirm';
import GlobalFormFieldKeyPrivate from '../../../../../Global/Form/Field/Key/Private';
import GlobalFormFieldKeyPublic from '../../../../../Global/Form/Field/Key/Public';

import { encrypt } from '../../../../../../actions/wallet';

const { clipboard } = require('electron');

class WalletPanelModalAccountRequestBackup extends Component<Props> {
  state = { keysCopied: false };
  promptContinue = () => {
    const {
      onSubmit
    } = this.props;
    if (onSubmit) onSubmit();
  }
  copyToClipboard = () => {
    clipboard.writeText(JSON.stringify(this.props.keys));
    this.setState({keysCopied: true});
  }
  render() {
    const {
      keys,
      onBack,
      t
    } = this.props;
    
    const { keysCopied } = this.state;
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
        <Button
          color="blue"
          content={t('wallet_account_request_copy_clipboard')}
          icon="clipboard"
          onClick={this.copyToClipboard}
        />
        <Segment basic>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={keys}
            style={{ padding: '1em', fontSize: '8px' }}
            theme="harmonic"
          />
        </Segment>
        
        <Button
          color="purple"
          content={t('wallet_account_request_keys_backup')}
          disabled={!keysCopied}
          floated="right"
          onClick={this.promptContinue}
          size="small"
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

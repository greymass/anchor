// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Button, Container, Divider, Form, Header, Message, Segment } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

const { clipboard } = require('electron');

class WalletPanelModalAccountRequestCode extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      accountCreated: false
    };
  }
  componentWillReceiveProps(nextProps){
    if (nextProps && nextProps.system.CREATEACCOUNT === 'SUCCESS'){
      this.setState({accountCreated: true});
    }
  }
  createAccount = () => {
    const { 
      actions,
      connection,
      settings,
      values 
    } = this.props;

    // hash/key for 'freesqrlacct'
    const hash = "95f3e6bb635fe2e3447d8f6b5086be9f4a0621a3ce608e70d3272c7d6bb720e5V11u/hhPO0HK57YkUY6RpXNFO7q07ACCxwKgVFU+dcG+Ff5VLj/KOjv4LWLFiAFGAK6OWmuuRAcSXF84ieb5sA==";
    const key = "95c6bb575ab3d10745e670d34ebb6b676ec3d3feb8171cd8415589d0b277d9e2gz3mRhyPvxSQQN7u2aS5eNYHVBoLytS9eOrE3CaygDu/Ff67C5MFS8w+Ww8rvzLhr+nPH/NGtd7a5UQrhOY2MA==";
    actions.setSetting('account', 'freesqrlacct');

    connection.keyProviderObfuscated = Object.assign({}, {
      hash: hash,
      key: key
    });
    
    if (settings.freeAccountCreated !== true){
      actions.createAccount(values.accountName, 
        values.active,
        '1 ' + settings.blockchain.tokenSymbol, 
        '1 ' + settings.blockchain.tokenSymbol, 
        values.owner, 
        4000, 0);
    }
  }
  render() {
    const {
      actions,
      onBack,
      t,
      settings,
      system,
      values
    } = this.props;
    const {
      accountCreated
    } = this.state;
    const confirmInfo = {
      account:values.accountName, 
      ownerKey:values.owner, 
      activeKey: values.active
    };
    if (system.CREATEACCOUNT === 'SUCCESS' && settings.account !== values.accountName){
      actions.setSetting('account', values.accountName); // this will pre-pop field when user goes to 'Lookup account' section
    }

    let lastErrorMessage = '';
    if (system.CREATEACCOUNT === 'FAILURE' && system[`CREATEACCOUNT_LAST_ERROR`].error) {
      lastErrorMessage = system.CREATEACCOUNT_LAST_ERROR.error.code + ':' + system.CREATEACCOUNT_LAST_ERROR.error.what;
    }

    return (
      <Segment loading={system.CREATEACCOUNT === 'PENDING'}>
        <Header>
          {t('wallet_account_request_account_header')}
          <Header.Subheader>
            {t('wallet_account_request_account_subheader')}
          </Header.Subheader>
        </Header>
        
        <Segment basic>
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={confirmInfo}
            style={{ padding: '1em', fontSize: '8px' }}
            theme="harmonic"
          />
        </Segment>

        <Form>
          <Container textAlign="center">
            <Form.Button
              disabled={accountCreated}
              color="purple"
              content={t('wallet_account_request_form_create_account')}
              onClick={this.createAccount}
            />
          </Container>
        </Form>
        <Divider hidden />
          {(system.CREATEACCOUNT === 'FAILURE')
          ? (
            <Message
              content={t('wallet_account_request_account_failed')}
              icon="info circle"
              warning
            />
          ) : ''}
          {(lastErrorMessage.length > 0)
          ? (
            <Message
              content={lastErrorMessage}
              icon="info circle"
              error
            />
          ) : ''}
          {(system.CREATEACCOUNT === 'SUCCESS')
          ? (
            <Message
              content={t('wallet_account_request_account_succeeded')}
              icon="info circle"
              warning
            />
          ) : ''}
          {(system.CREATEACCOUNT !== 'SUCCESS')
          ? (
          <Button
            content={t('back')}
            onClick={onBack}
            size="small"
          />
          ) : ''
          }
      </Segment>
    );
  }
}

export default translate('wallet')(WalletPanelModalAccountRequestCode);

// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Header, Icon, Input, List, Message, Modal, Segment } from 'semantic-ui-react';

const ecc = require('eosjs-ecc');

export default class WalletModalAccountLookup extends Component<Props> {
  state = {
    key: '',
    open: false,
    valid: false
  }

  onChange = (e, { value }) => {
    this.setState({
      key: value,
      valid: (ecc.isValidPublic(value) === true)
    }, () => {
      const { key, valid } = this.state;
      if (valid) {
        this.props.actions.getAccountByKey(key);
      } else {
        this.props.actions.clearAccountByKey();
      }
    });
  }

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  component

  render() {
    const {
      accounts,
      settings,
      validate
    } = this.props;
    const {
      key,
      open,
      valid
    } = this.state;
    const {
      __lookups
    } = accounts;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Modal
              trigger={(
                <a
                  onClick={this.onOpen}
                  role="button"
                >
                  {t('wallet_account_lookup_modal_trigger')}
                </a>
              )}
              onClose={this.onClose}
              open={open}
              size="tiny"
            >
              <Header icon="unlock" content={t('wallet_account_lookup_modal_title')} />
              <Modal.Content>
                <h3>{t('wallet_account_lookup_modal_description', {tokenSymbol:settings.blockchain.tokenSymbol})}</h3>
                <Form.Field
                  autoFocus
                  control={Input}
                  fluid
                  label={t('wallet_account_lookup_modal_field_label', {tokenSymbol:settings.blockchain.tokenSymbol})}
                  onChange={this.onChange}
                  onKeyPress={this.onKeyPress}
                />
                {(valid)
                  ? (
                    <Segment padded>
                      <Header size="small">
                        {t('wallet_account_lookup_modal_accounts_found')}
                      </Header>
                      <List divided relaxed>
                        {(!__lookups || !__lookups.length)
                          ? <List.Item key="none found" content={t('wallet_account_lookup_modal_accounts_found_none')} />
                          : __lookups.map((account) => <List.Item key={account} content={account} />)
                        }
                      </List>
                    </Segment>
                  )
                  : (
                    <span>
                      {(key)
                        ? (
                          <Segment padded>
                            <Header>
                              {t('wallet_account_lookup_modal_key_invalid')}
                            </Header>
                          </Segment>
                        )
                        : null
                      }
                    </span>
                  )
                }
                {(validate.WALLET_PASSWORD === 'FAILURE')
                  ? (
                    <Segment padded>
                      <Message
                        content={t('wallet_account_lookup_failure_content')}
                        error
                        header={t('wallet_account_lookup_failure_header')}
                        icon="warning circle"
                      />
                    </Segment>
                  ) : null
                }
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={this.onClose}
                >
                  <Icon name="x" /> {t('close')}
                </Button>
              </Modal.Actions>
            </Modal>
          )
        }
      </I18n>
    );
  }
}

// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Header, Icon, Input, Message, Modal } from 'semantic-ui-react';

export default class WalletPanelButtonUnlock extends Component<Props> {
  state = {
    password: '',
    open: false
  }

  onChange = (e, { value }) => this.setState({ password: value })

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onSubmit();
    }
  }

  onOpen = () => this.setState({ open: true });
  onClose = () => this.setState({ open: false });

  onSubmit = () => {
    const {
      unlockWallet,
      wallet
    } = this.props;
    const {
      password
    } = this.state;
    unlockWallet(wallet, password);
  }

  render() {
    const {
      validate
    } = this.props;
    const {
      open
    } = this.state;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Modal
              trigger={(
                <Button
                  color="blue"
                  content={t('wallet_panel_wallet_unlock')}
                  fluid
                  icon="unlock"
                  onClick={this.onOpen}
                />
              )}
              onClose={this.onClose}
              open={open}
              size="tiny"
            >
              <Header icon="unlock" content={t('wallet_panel_wallet_unlock_modal_title')} />
              <Modal.Content>
                <h3>{t('wallet_panel_wallet_unlock_modal_description')}</h3>
                <Form.Field
                  autoFocus
                  control={Input}
                  fluid
                  label={t('wallet_panel_password_label')}
                  onChange={this.onChange}
                  onKeyPress={this.onKeyPress}
                  type="password"
                />
                {(validate.WALLET_PASSWORD === 'FAILURE')
                  ? (
                    <Message
                      content={t('wallet_panel_wallet_unlock_failure_content')}
                      error
                      header={t('wallet_panel_wallet_unlock_failure_header')}
                      icon="warning circle"
                    />
                  ) : null
                }
              </Modal.Content>
              <Modal.Actions>
                <Button
                  onClick={this.onClose}
                >
                  <Icon name="x" /> {t('cancel')}
                </Button>
                <Button
                  color="green"
                  content={t('wallet_panel_wallet_unlock')}
                  icon="unlock"
                  loading={validate.WALLET_PASSWORD === 'pending'}
                  onClick={this.onSubmit}
                />
              </Modal.Actions>
            </Modal>

          )
        }
      </I18n>
    );
  }
}

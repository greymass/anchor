// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Form, Header, Icon, Input, Message, Modal } from 'semantic-ui-react';

class WalletModalUnlock extends Component<Props> {
  render() {
    const {
      onChange,
      onKeyPress,
      onClose,
      onSubmit,
      open,
      settings,
      t,
      trigger,
      validate
    } = this.props;
    return (
      <Modal
        centered={false}
        trigger={trigger}
        onClose={onClose}
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
            onChange={onChange}
            onKeyPress={onKeyPress}
            type="password"
          />
          {(settings && settings.walletMode !== 'cold' && validate.WALLET_PASSWORD === 'FAILURE')
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
            onClick={onClose}
          >
            <Icon name="x" /> {t('cancel')}
          </Button>
          <Button
            color="green"
            content={t('wallet_panel_wallet_unlock')}
            icon="unlock"
            onClick={onSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withTranslation('wallet')(WalletModalUnlock);

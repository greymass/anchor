// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Form, Header, Icon, Input, Modal } from 'semantic-ui-react';

class WalletPanelFormModalConfirm extends Component<Props> {
  state = {
    password: ''
  }

  compare = (e, { value }) => this.setState({
    matches: (value === this.props.password),
    password: value
  })

  onKeyPress = (e) => {
    const { matches } = this.state;
    if (matches && e.key === 'Enter') {
      this.props.onSubmit();
    }
  }

  render() {
    const {
      button,
      buttonText,
      disabled,
      floated,
      open,
      onCancel,
      onConfirm,
      onSubmit,
      password,
      t
    } = this.props;
    const matches = (this.state.password === password);
    return (
      <Modal
        centered={false}
        trigger={
          button ||
          (
            <Button
              color="blue"
              content={buttonText || t('wallet_panel_password_confirm_button')}
              floated={floated}
              disabled={disabled}
              onClick={onConfirm}
              size="small"
            />
          )
        }
        onClose={onCancel}
        open={open}
        size="tiny"
        style={{ height: 'auto' }}
      >
        <Header icon="lock" content={t('wallet_panel_password_confirm_title')} />
        <Modal.Content>
          <h3>{t('wallet_panel_password_confirm_description')}</h3>
          <Form>
            <Form.Field
              autoFocus
              control={Input}
              icon={matches ? 'checkmark' : 'x'}
              label={t('wallet_panel_password_label')}
              onChange={this.compare}
              onKeyPress={this.onKeyPress}
              type="password"
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            onClick={onCancel}
          >
            <Icon name="x" /> {t('cancel')}
          </Button>
          <Button
            color="green"
            disabled={!matches}
            onClick={onSubmit}
          >
            <Icon name="checkmark" /> {buttonText || t('wallet_panel_wallet_save')}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default withTranslation('wallet')(WalletPanelFormModalConfirm)

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Form, Header, Icon, Input, Message, Modal, Segment } from 'semantic-ui-react';

import * as WalletActions from '../../../actions/wallet';

class GlobalButtonElevate extends Component<Props> {
  state = {
    password: '',
    open: false
  }

  componentDidUpdate(prevProps) {
    const { validate} = this.props;
    if (
      this.state.open
      && prevProps.validate.WALLET_PASSWORD === 'PENDING'
      && validate.WALLET_PASSWORD === 'SUCCESS'
    ) {
      this.setState({
        open: false
      }, () => {
        const { password } = this.state;
        this.props.onSuccess(password);
      });
    }
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
      actions,
      wallet
    } = this.props;
    const {
      validateWalletPassword
    } = actions;
    const {
      password
    } = this.state;
    validateWalletPassword(password, wallet);
  }

  render() {
    const {
      settings,
      t,
      trigger,
      validate
    } = this.props;
    const {
      open
    } = this.state;
    const pending = (validate.WALLET_PASSWORD === 'PENDING');
    return (
      <Modal
        centered={false}
        trigger={trigger}
        onClose={this.onClose}
        onOpen={this.onOpen}
        open={open}
        size="tiny"
      >
        <Header icon="unlock" content={t('global_button_elevate_modal_title')} />
        <Modal.Content>
          <Segment basic>
            <h3>{t('global_button_elevate_modal_description')}</h3>
            <Form.Field
              autoFocus
              control={Input}
              disabled={pending}
              fluid
              label={t('wallet:wallet_panel_password_label')}
              onChange={this.onChange}
              onKeyPress={this.onKeyPress}
              type="password"
            />
          </Segment>
          {(settings && settings.walletMode !== 'cold' && validate.WALLET_PASSWORD === 'FAILURE')
            ? (
              <Message
                content={t('global_button_elevate_failure_content')}
                error
                header={t('global_button_elevate_failure_header')}
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
            content={t('global_button_elevate')}
            disabled={pending}
            loading={pending}
            icon="unlock"
            onClick={this.onSubmit}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions,
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalButtonElevate);

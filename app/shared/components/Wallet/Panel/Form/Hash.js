// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Button, Form, Header, Icon, Segment } from 'semantic-ui-react';

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
    if (this.props.onComplete) {
      this.props.onComplete();
    }
  }
  onConfirm = () => this.setState({ confirming: true });
  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onConfirm();
      e.preventDefault();
      return false;
    }
  }
  render() {
    const {
      t,
    } = this.props;
    const {
      confirming,
      password
    } = this.state;
    return (
      <Form onKeyPress={this.onKeyPress}>
        <Form.Field
          autoFocus
          control={Form.Input}
          fluid
          key="password"
          icon="lock"
          label={t('wallet_panel_password_label_r2')}
          name="password"
          type="password"
          onChange={this.onChange}
        />
        <Segment color="orange">
          <Header
            color="orange"
            icon="warning"
            content={t('global:global_account_import_password_header_one')}
            subheader={t('global:global_account_import_password_subheader_one')}
          />
        </Segment>
        <Segment basic clearing>
          {(this.props.onClose)
            ? (
              <Button
                floated="left"
                onClick={this.props.onClose}
              >
                <Icon name="x" /> {t('cancel')}
              </Button>
            )
            : false
          }
          <WalletPanelFormModalConfirm
            buttonText={t('wallet_panel_hash_button')}
            disabled={!password}
            floated="right"
            open={confirming}
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
            onSubmit={this.onComplete}
            password={password}
          />
        </Segment>
      </Form>
    );
  }
}

export default withTranslation(['wallet', 'global'])(WalletPanelFormHash);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';
import debounce from 'lodash/debounce';
import { translate } from 'react-i18next';
import { Button, Container, Form, Input, Message } from 'semantic-ui-react';

import WalletPanelFormModalConfirm from '../../components/Wallet/Panel/Form/Modal/Confirm';
import * as WalletActions from '../../actions/wallet';

type Props = {
  actions: {
    setWalletKey: () => void,
    setTemporaryKey: () => void
  },
  history: {},
  keys: {},
  t: () => void
};

class WelcomeWalletContainer extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      // editing: props.editing || false,
      confirming: false,
      encryptWallet: true
    };
  }

  isSafeish = (url) => url.startsWith('http:') || url.startsWith('https:')

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value.trim()
    });
  }, 300)

  onComplete = () => {
    const {
      encryptWallet,
      password
    } = this.state;
    const {
      actions,
      history,
      keys
    } = this.props;
    const {
      key
    } = keys;
    const {
      setWalletKey,
      setTemporaryKey
    } = actions;
    if (encryptWallet) {
      setWalletKey(key, password);
    } else {
      setTemporaryKey(key);
    }
    this.setState({
      confirming: false
    });
    history.push('/voter');
  }

  onToggle = () => this.setState({ encryptWallet: !this.state.encryptWallet });
  onConfirm = () => this.setState({ confirming: true });
  onCancel = () => this.setState({ confirming: false });
  // REMOVE 5JVXUUeXbpCdYTb4UjBC5goqqaZsB87aa7MfJzYLuLfrrd4teRZ
  // 5Ke1xus68ykFAHz5zsaYZEZp9LZF8KxZRgKxiyvMNRfA9rL5AAK

  render() {
    const {
      t,
    } = this.props;
    const {
      confirming,
      encryptWallet,
      password
    } = this.state;
    return (
      <Form>
        <Form.Checkbox
          checked={encryptWallet}
          label={t('wallet_panel_form_encrypt_wallet')}
          name="encryptWallet"
          onChange={this.onToggle}
          value={encryptWallet ? 'on' : 'off'}
        />
        {(encryptWallet)
        ? [(
          <Form.Field
            autoFocus
            control={Input}
            fluid
            icon="lock"
            label={t('wallet_panel_password_label')}
            name="password"
            type="password"
            onChange={this.onChange}
          />
          ), (
            <Message
              content={t('wallet_panel_form_will_save')}
            />
          ), (
            <Container textAlign="center">
              <WalletPanelFormModalConfirm
                open={confirming}
                onCancel={this.onCancel}
                onConfirm={this.onConfirm}
                onSubmit={this.onComplete}
                password={password}
              />
            </Container>
          )]
        : [(
          <Message
            content={t('wallet_panel_form_not_saved')}
          />
        ), (
          <Container textAlign="center">
            <Button
              content={t('wallet_panel_form_use_temporary')}
              color="green"
              onClick={this.onComplete}
            />
          </Container>
          )]
        }
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('wallet'),
  connect(mapStateToProps, mapDispatchToProps)
)(WelcomeWalletContainer);

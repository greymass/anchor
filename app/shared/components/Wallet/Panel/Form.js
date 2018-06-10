// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Divider, Form, Message } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

import WalletPanelFormAccount from './Form/Account';
import WalletPanelFormEncrypt from './Form/Encrypt';
import WalletPanelFormKey from './Form/Key';
import WalletPanelFormSubmit from './Form/Submit';

import FormMessageError from '../../Global/Form/Message/Error';

export default class WalletPanelForm extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      confirming: false,
      formData: Object.assign({}, {
        encryptWallet: true,
        password: ''
      }, props.keys, props.settings)
    };
  }

  componentDidMount() {
    // Validate settings on app start
    const {
      actions
    } = this.props;
    const {
      formData
    } = this.state;
    actions.validateKey(formData.key);
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      formData: { ...this.state.formData, [name]: value },
    });
    const {
      actions
    } = this.props;
    const { setSettingWithValidation } = actions;
    if (['account', 'node'].indexOf(name) !== -1) {
      setSettingWithValidation(name, value);
    }
  }, 300)

  onKeyChange = debounce((e, { name, value }) => {
    const {
      actions
    } = this.props;
    const { validateKey } = actions;
    validateKey(value);
    this.setState({
      formData: { ...this.state.formData, [name]: value },
    });
  }, 300)

  onToggle = (e, { name, checked }) => {
    this.setState({
      formData: { ...this.state.formData, [name]: (checked) },
    });
  }

  onConfirm = () => this.setState({ confirming: true });

  onCancel = () => this.setState({ confirming: false });

  onSubmit = () => {
    const {
      actions
    } = this.props;
    const {
      formData
    } = this.state;
    const {
      encryptWallet,
      key,
      password
    } = formData;
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
  }

  render() {
    const {
      actions,
      accounts,
      validate
    } = this.props;
    const {
      confirming,
      formData,
      error
    } = this.state;
    const {
      account,
      encryptWallet,
      key,
      password
    } = formData;
    const validUser = (
      validate.NODE === 'SUCCESS'
      && validate.ACCOUNT === 'SUCCESS'
      && validate.KEY === 'SUCCESS'
      && (!encryptWallet || (encryptWallet && password.length > 0))
    );
    if (validate.NODE !== 'SUCCESS') return '';
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <div>
              <Message
                attached="top"
                content={t('wallet_panel_form_create_wallet_body')}
                header={t('wallet_panel_form_create_wallet_header')}
                icon="bell"
                info
                size="small"
              />
              <Form
                className='attached fluid segment'
                onSubmit={
                  (encryptWallet)
                    ? this.onConfirm
                    : this.onSubmit
                }
              >
                <WalletPanelFormAccount
                  actions={actions}
                  accounts={accounts}
                  onChange={this.onChange}
                  validate={validate}
                  value={account}
                />
                <WalletPanelFormKey
                  onChange={this.onKeyChange}
                  validate={validate}
                  value={key}
                />
                <Divider />
                <WalletPanelFormEncrypt
                  encryptWallet={encryptWallet}
                  onChange={this.onChange}
                  onToggle={this.onToggle}
                />
                <Divider />
                <FormMessageError
                  error={t(error)}
                />
                <WalletPanelFormSubmit
                  confirming={confirming}
                  encryptWallet={encryptWallet}
                  onCancel={this.onCancel}
                  onConfirm={this.onConfirm}
                  onSubmit={this.onSubmit.bind(this)}
                  password={password}
                  validUser={validUser}
                />
              </Form>
            </div>
          )
        }
      </I18n>
    );
  }
}

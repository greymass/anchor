// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Form, Input, Message, Segment } from 'semantic-ui-react';
import debounce from 'lodash/debounce';

export default class WalletConfig extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      config: Object.assign({}, props.settings, props.wallet)
    };
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      error: false,
      config: { ...this.state.config, [name]: value },
    });
    const {
      actions,
      settings
    } = this.props;
    const { setSettingWithValidation } = actions;
    setSettingWithValidation(settings, name, value);
  }, 300)

  onKeyChange = debounce((e, { value }) => {
    const {
      actions,
      settings
    } = this.props;
    const { setWalletKey } = actions;
    setWalletKey(settings, value);
  }, 300)

  render() {
    const {
      validate,
      wallet
    } = this.props;
    const {
      error,
      config,
    } = this.state;
    const {
      account,
      node
    } = config;
    const {
      key
    } = wallet;
    return (
      <I18n ns="wallet">
        {
          (t) => (
            <Segment basic>
              <Form onSubmit={this.onSubmit}>
                <Form.Field
                  control={Input}
                  fluid
                  icon={(validate.NODE === 'SUCCESS') ? 'checkmark' : 'x'}
                  label={t('wallet_config_node')}
                  loading={(validate.NODE === 'PENDING')}
                  name="node"
                  onChange={this.onChange}
                  defaultValue={node}
                />
                <Form.Field
                  control={Input}
                  fluid
                  icon={(validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS') ? 'checkmark' : 'x'}
                  label={t('wallet_config_account')}
                  loading={(validate.ACCOUNT === 'PENDING')}
                  name="account"
                  onChange={this.onChange}
                  defaultValue={account}
                />
                <Form.Field
                  control={Input}
                  fluid
                  icon={(validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS' && validate.KEY === 'SUCCESS') ? 'checkmark' : 'x'}
                  label={t('wallet_config_key')}
                  loading={(validate.KEY === 'PENDING')}
                  name="key"
                  onChange={this.onKeyChange}
                  type={(validate.NODE === 'SUCCESS' && validate.ACCOUNT === 'SUCCESS' && validate.KEY === 'SUCCESS') ? 'password' : 'text'}
                  defaultValue={key}
                />
                {(error)
                  ? (
                    <Message negative>
                      <p>{t(error)}</p>
                    </Message>
                  )
                  : ''
                }
              </Form>
            </Segment>
          )
        }
      </I18n>
    );
  }
}

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Form, Header, Message, Modal, Select } from 'semantic-ui-react';

import { decrypt } from '../../../actions/wallet';

import GlobalFormFieldAccount from '../../../components/Global/Form/Field/Account';
import GlobalFormFieldKeyPublic from '../../../components/Global/Form/Field/Key/Public';
import GlobalFormFieldKeyPrivate from '../../../components/Global/Form/Field/Key/Private';

const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');

const authOptions = [
  { key: 'active', text: 'active', value: 'active' },
  { key: 'owner', text: 'owner', value: 'owner' },
];

const walletOptions = [
  { key: 'ledger', text: 'ledger', value: 'ledger' },
  { key: 'hot', text: 'hot', value: 'hot' },
  { key: 'cold', text: 'cold', value: 'cold' },
  { key: 'watch', text: 'watch', value: 'watch' },
];

class GlobalAccountEdit extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      connection,
      data,
      settings,
    } = this.props;
    const {
      account,
      authorization,
      chainId
    } = data;
    const state = {};
    if (
      account === settings.account
      && authorization === settings.authorization
      && chainId === settings.chainId
      && connection.keyProviderObfuscated
    ) {
      const {
        hash,
        key
      } = connection.keyProviderObfuscated;
      if (hash && key) {
        const wif = decrypt(key, hash, 1).toString(CryptoJS.enc.Utf8);
        if (ecc.isValidPrivate(wif) === true) {
          state.wif = wif;
        }
      }
    }
    this.state = state;
  }
  onClose = () => {
    this.props.onClose();
  }
  onChange = (e, { name, value, valid }) => {
    this.setState({
      formError: null,
      submitDisabled: false,
      [`${name}Valid`]: valid,
      [name]: value
    }, () => {
      const error = this.errorInForm();

      if (error) {
        let formError;

        if (error !== true) {
          formError = error;
        }
        this.setState({
          formError,
          submitDisabled: true
        });
      }
    });
  }
  errorInForm = () => {
    return false;
  }
  render() {
    const {
      app,
      connection,
      data,
      t,
    } = this.props;
    const { wif } = this.state;
    return (
      <Modal
        closeIcon
        closeOnDimmerClick={false}
        onClose={this.onClose}
        open
        size
      >
        <Modal.Header>
          <Header
            content={t('global_account_edit_modal_header')}
            icon="id card"
            subheader={t('global_account_edit_modal_subheader')}
          />
        </Modal.Header>
        <Modal.Content>
          <Header>
            <Form>
              <GlobalFormFieldAccount
                app={app}
                label={t('tools:tools_form_account_edit_account')}
                name="account"
                onChange={this.onChange}
                value={data.account || ''}
              />
              <Form.Field
                control={Select}
                defaultValue={data.authorization}
                label={t('tools:tools_form_account_edit_authorization')}
                name="authorization"
                options={authOptions}
              />
              <Form.Field
                control={Select}
                defaultValue={data.mode}
                label={t('tools:tools_form_account_edit_mode')}
                name="mode"
                options={walletOptions}
              />
              <GlobalFormFieldKeyPublic
                connection={connection}
                defaultValue={data.pubkey || ''}
                label={t('tools:tools_form_account_edit_pubkey')}
                name="pubkey"
                onChange={this.onChange}
              />
              {(wif)
                ? (
                  <GlobalFormFieldKeyPrivate
                    autoFocus
                    connection={connection}
                    label={t('global_account_import_private_key')}
                    name="key"
                    placeholder={t('welcome:welcome_key_compare_placeholder')}
                    onChange={this.onChange}
                    value={wif}
                  />
                )
                : false
              }
            </Form>
            <Message
              content={t('tools:tools_form_account_edit_nosave')}
            />
          </Header>
        </Modal.Content>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountEdit);

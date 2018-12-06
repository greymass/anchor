// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Form, Header, Message, Modal, Select } from 'semantic-ui-react';

import GlobalFormFieldAccount from '../../../components/Global/Form/Field/Account';
import GlobalFormFieldKeyPublic from '../../../components/Global/Form/Field/Key/Public';
// import GlobalFormFieldKeyPrivate from '../../../components/Global/Form/Field/Key/Private';
// import GlobalFormFieldGeneric from '../../../components/Global/Form/Field/Generic';

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
      account,
      authorization,
      connection,
      data,
      t,
    } = this.props;
    return (
      <Modal
        centered={false}
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

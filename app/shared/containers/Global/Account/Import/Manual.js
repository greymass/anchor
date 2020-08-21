// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Checkbox, Form, Header, Icon, Segment, Tab } from 'semantic-ui-react';

import GlobalAccountImportElementsAccountList from './Elements/AccountList';
import GlobalButtonElevate from '../../Button/Elevate';
import GlobalFormFieldAccount from '../../../../components/Global/Form/Field/Account';
import GlobalFormFieldKeyPrivate from '../../../../components/Global/Form/Field/Key/Private';
import GlobalFormFieldString from '../../../../components/Global/Form/Field/String';

import EOSAccount from '../../../../utils/EOS/Account';

import * as AccountsActions from '../../../../actions/accounts';
import * as SettingsActions from '../../../../actions/settings';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalModalAccountImportManual extends Component<Props> {
  state = {
    account: '',
    authAccount: '',
    authPermission: '',
    authType: 'key',
    disabled: true,
    permission: '',
    key: '',
    valids: {
      account: false,
      authAccount: false,
      authPermission: false,
      permission: false,
      key: false,
    },
  }
  onChangeType = (e, { value }) => this.setState({ authType: value })
  importAccounts = (password) => {
    const {
      account,
      authAccount,
      authPermission,
      authType,
      disabled,
      permission,
      key,
    } = this.state;
    const {
      actions,
      settings
    } = this.props;
    const {
      chainId
    } = settings;
    console.log(
      "import",
      account,
      authAccount,
      authPermission,
      authType,
      disabled,
      permission,
      key,
    )
    switch (authType) {
      default:
      case 'key': {
        actions.importWallet(chainId, account, permission, key, password);
        break;
      }
      case 'account': {
        actions.importWalletAuth(chainId, account, permission, authAccount, authPermission, password);
        break;
      }
    }
    this.props.onClose();
  }
  onChange = (e, { name, valid, value }) => {
    const { authType, valids } = this.state;
    valids[name] = valid;
    let allValid = false;
    switch (authType) {
      case 'account': {
        allValid = (
          valids.account
          && valids.permission
          && valids.authAccount
          && valids.authPermission
        );
        break;
      }
      case 'key':
      default: {
        allValid = (
          valids.account
          && valids.permission
          && valids.key
        );
        break;
      }
    }
    this.setState({
      [name]: value,
      disabled: !allValid,
      valids,
    });
  }
  render() {
    const {
      accounts,
      connection,
      onClose,
      settings,
      t,
      validate,
      wallets
    } = this.props;
    const {
      account,
      authAccount,
      authPermission,
      authType,
      disabled,
      permission,
      key,
    } = this.state;
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content={t('global_account_import_manual_header_one')}
            subheader={t('global_account_import_manual_subheader_one')}
          />
          <Segment>
          <Form>
            <GlobalFormFieldAccount
              autofocus
              label={t('tools:tools_form_create_account_account_name')}
              name="account"
              onChange={this.onChange}
              value={account}
            />
            <GlobalFormFieldString
              label={t('tools:tools_form_permissions_auth_permission')}
              name="permission"
              onChange={this.onChange}
              value={permission}
            />
            <Form.Field>
              <label>{t('global_account_import_manual_by_label')}</label>
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label={t('global_account_import_manual_by_key')}
                name="authType"
                value="key"
                checked={authType === 'key'}
                onChange={this.onChangeType}
              />
            </Form.Field>
            <Form.Field>
              <Checkbox
                radio
                label={t('global_account_import_manual_by_auth')}
                name="authType"
                value="account"
                checked={authType === 'account'}
                onChange={this.onChangeType}
              />
            </Form.Field>
            {(authType === 'key')
              ? (
                <Segment>
                  <Header
                    content={t('global_account_import_manual_account_key_header')}
                    size="small"
                    subheader={t('global_account_import_manual_account_key_subheader')}
                  />
                  <GlobalFormFieldKeyPrivate
                    connection={connection}
                    label={t('global_account_import_private_key')}
                    name="key"
                    placeholder={t('welcome:welcome_key_compare_placeholder')}
                    onChange={this.onChange}
                    value={key}
                  />
                </Segment>
              )
              : false
            }
            {(authType === 'account')
              ? (
                <Segment>
                  <Header
                    content={t('global_account_import_manual_account_auth_header')}
                    size="small"
                    subheader={t('global_account_import_manual_account_auth_subheader')}
                  />
                  <GlobalFormFieldAccount
                    autofocus
                    label={t('tools:tools_form_create_account_account_name')}
                    name="authAccount"
                    onChange={this.onChange}
                    value={authAccount}
                  />
                  <GlobalFormFieldString
                    label={t('tools:tools_form_permissions_auth_permission')}
                    name="authPermission"
                    onChange={this.onChange}
                    value={authPermission}
                  />
                </Segment>
              )
              : false
            }

          </Form>
          </Segment>
          <Segment basic clearing>
            <Button
              floated="left"
              onClick={onClose}
            >
              <Icon name="x" /> {t('cancel')}
            </Button>
            <GlobalButtonElevate
              onSuccess={this.importAccounts}
              settings={settings}
              trigger={(
                <Button
                  color="green"
                  content={t('global_button_account_import_action')}
                  disabled={disabled}
                  floated="right"
                  icon="circle plus"
                />
              )}
              validate={validate}
            />
          </Segment>
        </Segment>
      </Tab.Pane>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    connection: state.connection,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallets: state.wallets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...SettingsActions,
      ...WalletActions,
      ...WalletsActions
    }, dispatch)
  };
}

export default compose(
  withTranslation(['global', 'tools', 'welcome']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportManual);

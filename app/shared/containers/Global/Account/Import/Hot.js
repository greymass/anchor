// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Checkbox, Divider, Grid, Header, Icon, Message, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../../Button/Elevate';
import GlobalFormFieldKeyPrivate from '../../../../components/Global/Form/Field/Key/Private';
import WalletPanelFormHash from '../../../../components/Wallet/Panel/Form/Hash';
import GlobalModalAccountImportPassword from './Password';

import EOSAccount from '../../../../utils/EOS/Account';
import * as AccountsActions from '../../../../actions/accounts';
import * as SettingsActions from '../../../../actions/settings';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalModalAccountImportHot extends Component<Props> {
  state = {
    selected: [],
    publicKey: '',
    valid: false,
    value: ''
  }
  componentDidMount() {
    this.props.actions.clearAccountByKey();
  }
  importAccounts = (password) => {
    const {
      selected,
      value
    } = this.state;
    const {
      actions,
      settings
    } = this.props;
    const {
      chainId
    } = settings;
    selected.forEach((auth) => {
      const [account, authorization] = auth.split('@');
      actions.importWallet(chainId, account, authorization, value, password);
    });
    this.props.onClose();
  }
  onChange = (e, data) => {
    const newState = {
      ...data,
      selected: []
    };
    this.setState(newState, () => {
      const { actions } = this.props;
      const {
        publicKey,
        valid
      } = newState;
      if (valid) {
        actions.getAccountByKey(publicKey);
      } else {
        actions.clearAccountByKey();
      }
    });
  }
  toggleAccount = (e, { checked, name }) => {
    const selected = [...this.state.selected];
    const existing = selected.indexOf(name);
    if (checked && existing < 0) {
      selected.push(name);
    } else if (!checked && existing >= 0) {
      selected.splice(existing, 1);
    }
    this.setState({ selected });
  }
  render() {
    const {
      accounts,
      actions,
      connection,
      onClose,
      settings,
      system,
      t,
      validate,
      wallets
    } = this.props;
    const {
      publicKey,
      selected,
      valid,
      value
    } = this.state;
    const matches = accounts.__lookups;
    const disabled = (!selected.length || !valid);

    let passwordPrompt = false;
    if ([undefined, 'watch', 'ledger'].includes(settings.walletMode) && !settings.walletHash) {
      const hotWalletExists = wallets.some(o => o.mode === 'hot');
      if (!hotWalletExists) {
        passwordPrompt = true;
      }
    }
    return (
      <Tab.Pane>
        {(passwordPrompt)
          ? (
            <GlobalModalAccountImportPassword onClose={this.props.onClose} />
          )
          : (
            <Segment basic>
              <Header
                content="Import a Private Key"
                subheader="Anchor will encrypt your private key locally and then find the EOS accounts matching the public key."
              />
              <GlobalFormFieldKeyPrivate
                autoFocus
                connection={connection}
                label={t('global_account_import_private_key')}
                name="key"
                placeholder={t('welcome:welcome_key_compare_placeholder')}
                onChange={this.onChange}
                value={value}
              />
              {(value && matches.length > 0)
                ? (
                  <Segment stacked color="blue">
                    {t('global_account_import_select_accounts')}
                    <Divider />
                    {(matches.map((account) => {
                        const data = accounts[account];
                      if (data) {
                        const authorizations = new EOSAccount(data).getAuthorizations(publicKey);
                        return authorizations.map((authorization) => {
                            const auth = `${account}@${authorization.perm_name}`;
                          return (
                            <p>
                              <Checkbox
                                label={auth}
                                name={auth}
                                onChange={this.toggleAccount}
                              />
                            </p>
                          );
                        });
                      }
                        return false;
                    }))}
                  </Segment>
                )
                : false
              }
              {(value && matches.length === 0 && system.ACCOUNT_BY_KEY === 'PENDING')
                ? <Segment loading />
                : false
              }
              {(value && matches.length === 0 && system.ACCOUNT_BY_KEY === 'SUCCESS')
                ? (
                  <Segment stacked color="red">
                    <Header>
                      {t('welcome:welcome_account_lookup_fail_title')}
                    </Header>
                    {t('welcome:welcome_account_lookup_fail_content')}
                  </Segment>
                )
                : false
              }
              <Divider />
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
          )
        }
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
  translate(['global','welcome']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportHot);

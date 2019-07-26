// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Checkbox, Divider, Grid, Header, List, Icon, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../../Button/Elevate';
import GlobalFormFieldKeyPrivate from '../../../../components/Global/Form/Field/Key/Private';
import WalletPanelFormHash from '../../../../components/Wallet/Panel/Form/Hash';
import GlobalModalAccountImportPassword from './Password';

import EOSAccount from '../../../../utils/EOS/Account';
import * as AccountsActions from '../../../../actions/accounts';
import * as SettingsActions from '../../../../actions/settings';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalModalAccountImportExisting extends Component<Props> {
  state = {
    selected: [],
    publicKey: '',
    valid: false,
    value: ''
  }
  componentDidMount() {
    this.props.actions.clearAccountByKey();
    this.props.actions.getAccountByKeys(this.props.pubkeys.available);
  }
  componentWillReceiveProps(nextProps) {
    const { validate } = this.props;
    const nextValidate = nextProps.validate;
    if (
      validate.NODE === 'PENDING'
      && nextValidate.NODE === 'SUCCESS'
    ) {
      this.props.actions.clearAccountByKey();
      this.props.actions.getAccountByKeys(this.props.pubkeys.available);
    }
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
      const mapped = this.props.accounts.__map
      if (Object.keys(mapped).length) {
        Object.keys(mapped).map((key) => {
          if (mapped[key].includes(auth)) {
            actions.importWallet(chainId, account, authorization, value, password, 'unknown', key);
          }
        })
      } else {
        actions.importWallet(chainId, account, authorization, value, password);
      }
    });
    this.props.onClose();
  }
  toggleAccount = (e, { checked, name }) => {
    const selected = [...this.state.selected];
    const existing = selected.indexOf(name);
    if (checked && existing < 0) {
      selected.push(name);
    } else if (!checked && existing >= 0) {
      selected.splice(existing, 1);
    }
    this.setState({
      selected,
      valid: (selected.length > 0)
    });
  }
  toggleAll = () => {
    const { selected } = this.state;
    if (selected.length > 0) {
      this.setState({ selected: [], valid: false });
    } else {
      const { accounts, wallets } = this.props;
      const matches = accounts.__lookups;
      if (matches[0].includes('@')) {
        const results = matches.filter((match) => {
          const [accountName, accountPerm] = match.split('@');
          const exists = find(wallets, {
            account: accountName,
            authorization: accountPerm
          });
          console.log(accountName, accountPerm, exists)
          return !(exists)
        })
        console.log(results)
        this.setState({ selected: results, valid: true })
      } else {
        const { pubkeys, wallets } = this.props
        const results = matches.map((match) => {
          const data = accounts[match];
          if (data) {
            const authorizations = new EOSAccount(data).getAuthorizations(pubkeys.available);
            return authorizations.map((authorization) => {
              const auth = `${match}@${authorization.perm_name}`
              const exists = find(wallets, {
                account: match,
                authorization: authorization.perm_name
              });
              if (exists) return false;
              return auth;
            });
          }
        });
        this.setState({
          selected: [].concat.apply([], results),
          valid: true
        });
      }
    }
  }
  render() {
    const {
      accounts,
      actions,
      connection,
      onClose,
      pubkeys,
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
    const filtered = matches.filter((match) => {
      if (match.includes('@')) {
        const [accountName, accountPerm] = match.split('@');
        const exists = find(wallets, {
          account: accountName,
          authorization: accountPerm
        });
        return !(exists);
      } else {
        const data = accounts[match];
        if (data) {
          const authorizations = new EOSAccount(data).getAuthorizations(pubkeys.available);
          const authMatches = authorizations.filter((authorization) => {
            const exists = find(wallets, {
              account: match,
              authorization: authorization.perm_name
            });
            return exists;
          });
          return authMatches.length === 0
        }
      }
    })
    const disabled = (!selected.length || !valid);
    // console.log(selected)
    if ([undefined, 'watch', 'ledger'].includes(settings.walletMode) && !settings.walletHash) {
      // If a hot wallet already exists and a wallet hash does not, inform them to swap first
      const hotWalletExists = wallets.some(o => o.mode === 'hot');
      if (!hotWalletExists) {
        return <GlobalModalAccountImportPassword />;
      }
    }
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content="Automatically find available accounts"
            subheader={t('global_account_import_existing_description')}
          />
          {(filtered.length > 0)
            ? (
              <Segment stacked color="blue">
                <p>{t('global_account_import_existing_accounts')}</p>
                <Button
                  content="Toggle All"
                  onClick={this.toggleAll}
                  size="tiny"
                />
                <List divided relaxed>
                  {(filtered.map((account) => {
                    if (account.includes('@')) {
                      return (
                        <List.Item>
                          <Checkbox
                            checked={selected.includes(account)}
                            label={account}
                            name={account}
                            onChange={this.toggleAccount}
                          />
                        </List.Item>
                      );
                    } else {
                      const data = accounts[account];
                      if (data) {
                        const authorizations = new EOSAccount(data).getAuthorizations(pubkeys.available);
                        return authorizations.map((authorization) => {
                          const auth = `${account}@${authorization.perm_name}`;
                          return (
                            <List.Item>
                              <Checkbox
                                checked={selected.includes(auth)}
                                label={auth}
                                name={auth}
                                onChange={this.toggleAccount}
                              />
                            </List.Item>
                          );
                        });
                      }
                    }
                    return false;
                  }))}
                </List>
              </Segment>
            )
            : false
          }
          {(filtered.length === 0 && (system.ACCOUNT_BY_KEYS === 'PENDING' || system.ACCOUNT_BY_KEY === 'PENDING'))
            ? <Segment loading style={{ minHeight: '150px' }}/>
            : false
          }
          {(filtered.length === 0
            && (system.ACCOUNT_BY_KEYS === 'SUCCESS' || system.ACCOUNT_BY_KEY === 'SUCCESS')
            && (system.ACCOUNT_BY_KEYS !== 'PENDING' && system.ACCOUNT_BY_KEY !== 'PENDING')
          )
            ? (
              <Segment stacked size="large" color="orange">
                <Header>
                  Failed to locate any additional accounts
                </Header>
                All accounts for this blockchain that match your existing keypairs have already been imported. Import a new private key to detect new accounts.
              </Segment>
            )
            : false
          }
        </Segment>
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
      </Tab.Pane>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    connection: state.connection,
    pubkeys: {
      available: state.storage.keys,
    },
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
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportExisting);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { find } from 'lodash';
import { Button, Divider, Header, Icon, Message, Segment, Tab } from 'semantic-ui-react';
import { PublicKey } from '@greymass/eosio';

import GlobalAccountImportElementsAccountList from './Elements/AccountList';
import GlobalButtonElevate from '../../Button/Elevate';
import GlobalModalAccountImportPassword from './Password';

import EOSAccount from '../../../../utils/EOS/Account';
import * as AccountsActions from '../../../../actions/accounts';
import * as SettingsActions from '../../../../actions/settings';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

import makeGetKeysUnlocked from '../../../../selectors/getKeysUnlocked';

class GlobalModalAccountImportDetect extends Component<Props> {
  state = {
    selected: [],
    publicKey: '',
    valid: false,
    value: ''
  };
  componentDidMount() {
    this.fetchAccountsByKey();
  }
  componentWillReceiveProps(nextProps) {
    const { validate } = this.props;
    const nextValidate = nextProps.validate;
    if (
      validate.NODE === 'PENDING'
      && nextValidate.NODE === 'SUCCESS'
    ) {
      this.fetchAccountsByKey();
    }
  }

  fetchAccountsByKey = () => {
    const {
      connection,
      pubkeys
    } = this.props;
    const pubkeysToLookup = pubkeys.available.map(pubkey => {
      const publicKey = PublicKey.from(pubkey);
      return publicKey.toLegacyString(connection.keyPrefix);
    });
    this.props.actions.clearAccountByKey();
    this.props.actions.getAccountByKeys(pubkeysToLookup);
  };

  importAccounts = (password) => {
    const {
      selected,
      value
    } = this.state;
    const {
      actions,
      paths,
      settings
    } = this.props;
    const {
      chainId
    } = settings;
    selected.forEach((data) => {
      const [auth, publicKey] = data.split('|');
      const [account, authorization] = auth.split('@');
      const mapped = this.props.accounts.__map;
      if (Object.keys(mapped).length) {
        Object.keys(mapped).forEach((key) => {
          if (mapped[key].includes(auth) && key === publicKey) {
            if (paths[key]) {
              actions.importWallet(chainId, account, authorization, null, password, 'ledger', key, paths[key]);
            } else {
              actions.importWallet(chainId, account, authorization, value, password, 'unknown', key);
            }
          }
        });
      } else {
        actions.importWallet(chainId, account, authorization, value, password, 'unknown', publicKey);
      }
    });
    this.props.onClose();
  }
  toggleAccount = (e, { checked, name, publicKey }) => {
    const combined = `${name}|${publicKey}`;
    const selected = [...this.state.selected];
    const existing = selected.indexOf(combined);
    if (checked && existing < 0) {
      selected.push(combined);
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
      let matches = accounts.__lookups;
      if (Object.keys(accounts.__permissions).length) {
        matches = accounts.__permissions;
      }
      if (matches[0].includes('@')) {
        const results = matches.filter((match) => {
          const [accountName, accountPerm] = match.split('@');
          const exists = find(wallets, {
            account: accountName,
            authorization: accountPerm
          });
          return !(exists);
        });
        this.setState({ selected: results, valid: true });
      } else {
        const { pubkeys, wallets } = this.props;
        const results = matches.map((match) => {
          const data = accounts[match];
          if (data) {
            const authorizations = new EOSAccount(data).getAuthorizations(pubkeys.available);
            return authorizations.map((authorization) => {
              const auth = `${match}@${authorization.perm_name}`;
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
  };
  render() {
    const {
      accounts,
      onClose,
      pubkeys,
      settings,
      system,
      t,
      validate,
      wallets
    } = this.props;
    const {
      selected,
      valid,
    } = this.state;
    let matches = accounts.__lookups;
    if (Object.keys(accounts.__permissions).length) {
      matches = accounts.__permissions;
    }
    const filtered = [];
    matches.forEach((match) => {
      if (match.includes('@')) {
        const [accountName, accountPerm] = match.split('@');
        const exists = find(wallets, {
          account: accountName,
          authorization: accountPerm
        });
        if (!exists) {
          filtered.push(match);
        }
      } else {
        const data = accounts[match];
        if (data) {
          const authorizations = new EOSAccount(data).getAuthorizations(pubkeys.available);
          authorizations.forEach((authorization) => {
            const exists = find(wallets, {
              account: match,
              authorization: authorization.perm_name,
              chainId: settings.chainId,
            });
            if (!exists) {
              filtered.push(`${match}@${authorization.perm_name}`);
            }
          });
        }
      }
    });
    const disabled = (!selected.length || !valid);
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
            content={t('global_account_import_detect_header_one')}
            subheader={t('global_account_import_existing_description')}
          />
          <Message
            content="Depending on the number of keys you have loaded, it may take some time for all accounts to be found."
            header="Accounts may take a minute to display"
          />
          {(filtered.length > 0)
            ? (
              <React.Fragment>
                <Button
                  content="Toggle All"
                  onClick={this.toggleAll}
                  size="tiny"
                  style={{ display: 'none' }}
                />
                {pubkeys.available.map((publicKey) => (
                  <GlobalAccountImportElementsAccountList
                    publicKey={publicKey}
                    toggleAccount={this.toggleAccount}
                    value
                  />
                ))}
              </React.Fragment>
            )
            : false
          }
          {(filtered.length === 0 && (system.ACCOUNT_BY_KEYS === 'PENDING' || system.ACCOUNT_BY_KEY === 'PENDING'))
            ? <Segment loading style={{ minHeight: '150px' }} />
            : false
          }
          {(filtered.length === 0
            && (system.ACCOUNT_BY_KEYS === 'SUCCESS' || system.ACCOUNT_BY_KEY === 'SUCCESS')
            && (system.ACCOUNT_BY_KEYS !== 'PENDING' && system.ACCOUNT_BY_KEY !== 'PENDING')
          )
            ? (
              <Segment stacked size="large" color="orange">
                <Header>
                  {t('global_account_import_detect_header_two')}
                </Header>
                {t('global_account_import_detect_subheader_two')}
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

const makeMapStateToProps = () => {
  const getKeysUnlocked = makeGetKeysUnlocked();
  const mapStateToProps = (state, props) => ({
    accounts: state.accounts,
    connection: state.connection,
    paths: state.storage.paths,
    pubkeys: getKeysUnlocked(state, props),
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallets: state.wallets
  });
  return mapStateToProps;
};

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
  withTranslation('global'),
  connect(makeMapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportDetect);

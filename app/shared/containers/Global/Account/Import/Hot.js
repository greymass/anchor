// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Header, Icon, Segment, Tab } from 'semantic-ui-react';

import GlobalAccountImportElementsAccountList from './Elements/AccountList';
import GlobalButtonElevate from '../../Button/Elevate';
import GlobalFormFieldKeyPrivate from '../../../../components/Global/Form/Field/Key/Private';

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
  toggleAll = () => {
    const { accounts, connection, wallets } = this.props;
    const { publicKey } = this.state;
    const matches = accounts.__lookups;
    const selected = [];
    // Generate possible combinations and exclude existing wallets
    matches.forEach((account) => {
      const data = accounts[account];
      if (data) {
        const authorizationList = new EOSAccount(data).getAuthorizations(publicKey);
        authorizationList.forEach((authorization) => {
          const existingWallet = wallets.find(wallet => (
            authorization.perm_name === wallet.authorization
            && account === wallet.account
            && connection.chainId === wallet.chainId
          ));
          if (!existingWallet) {
            selected.push(`${account}@${authorization.perm_name}`);
          }
        });
      }
    });
    if (selected.length === this.state.selected.length) {
      // Reset if everything is selected
      this.setState({ selected: [] });
    } else {
      // otherwise add all auths to the list
      this.setState({ selected });
    }
  }
  render() {
    const {
      accounts,
      connection,
      onClose,
      settings,
      t,
      validate
    } = this.props;
    const {
      publicKey,
      selected,
      valid,
      value
    } = this.state;
    const matches = accounts.__lookups;

    const disabled = (!selected.length || !valid);
    return (
      <Tab.Pane>
        <Segment basic>
          <Header
            content={t('global_account_import_hot_header_one')}
            subheader={t('global_account_import_hot_subheader_one')}
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
          {(publicKey)
            ? (
              <GlobalAccountImportElementsAccountList
                publicKey={publicKey}
                selected={selected}
                toggleAccount={this.toggleAccount}
              />
            )
            : false
          }
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
            {(matches.length > 1)
              ? (
                <Button
                  content="Select All"
                  color="blue"
                  floated="right"
                  onClick={this.toggleAll}
                />
              )
              : false
            }

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
  withTranslation(['global', 'welcome']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportHot);

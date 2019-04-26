// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Checkbox, Divider, Dropdown, Grid, Header, Icon, Modal, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../../Button/Elevate';
import GlobalFormFieldAccount from '../../../../components/Global/Form/Field/Account';
import GlobalFormFieldKeyPrivate from '../../../../components/Global/Form/Field/Key/Private';
import WalletPanelFormHash from '../../../../components/Wallet/Panel/Form/Hash';

import * as AccountsActions from '../../../../actions/accounts';
import * as SettingsActions from '../../../../actions/settings';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalModalAccountImportCold extends Component<Props> {
  state = {
    account: '',
    accountValid: false,
    authorization: 'active',
    key: '',
    keyValid: false
  }
  componentDidMount() {
    this.props.actions.clearAccountByKey();
  }
  importAccounts = (password) => {
    const {
      account,
      authorization,
      key
    } = this.state;
    const {
      actions,
      settings,
    } = this.props;
    actions.importWallet(settings.chainId, account, authorization, key, password, 'cold');
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  onChange = (e, { name, valid, value }) => {
    this.setState({
      [name]: value,
      [`${name}Valid`]: valid
    });
  }
  setAuthorization = (e, { value }) => {
    this.setState({
      authorization: value
    });
  }
  render() {
    const {
      accounts,
      actions,
      onClose,
      settings,
      system,
      t,
      validate
    } = this.props;
    const {
      account,
      accountValid,
      authorization,
      key,
      keyValid
    } = this.state;
    const disabled = (!accountValid || !keyValid);
    const options = ['active', 'owner'].map((authority) => (
      {
        key: authority,
        text: authority,
        value: authority
      }
    ));
    if (!settings.walletHash) {
      return (
        <Tab.Pane>
          <Grid divided="vertically" padded="vertically" stackable>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Header size="large">
                  <Icon name="lock" />
                  <Header.Content>
                    {t('global_account_import_private_requires_hash_header_r2')}
                    <Header.Subheader>
                      {t('global_account_import_private_requires_hash_subheader_r2')}
                    </Header.Subheader>
                  </Header.Content>
                </Header>
              </Grid.Column>
              <Grid.Column verticalAlign="middle" textAlign="center">
                <p>
                  <WalletPanelFormHash
                    actions={actions}
                  />
                </p>
                <p>
                  Ensure you keep a copy of both your password and your keys safely offline. This password cannot be recovered.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Tab.Pane>
      );
    }
    return (
      <Tab.Pane>
        <Grid stackable>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Grid.Column>
                <Segment color="blue">
                  <Header icon>
                    <Icon color="blue" name="snowflake" />
                    <Header.Content>
                      {t('global_account_import_private_cold_wallet_header')}
                      <Header.Subheader>
                        {t('global_account_import_private_cold_wallet_subheader')}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                  <p>
                    {t('global_account_import_private_cold_wallet_description')}
                  </p>
                </Segment>
              </Grid.Column>
            </Grid.Column>
            <Grid.Column>
              <Segment attached="top">
                <GlobalFormFieldAccount
                  autoFocus
                  fluid
                  label={t('global_account_import_watch_account')}
                  name="account"
                  placeholder={t('welcome:welcome_account_compare_placeholder')}
                  onChange={this.onChange}
                  ref={(input) => { this.input = input; }}
                  value={account}
                />
              </Segment>
              <Segment attached>
                <GlobalFormFieldKeyPrivate
                  label={t('global_account_import_private_key')}
                  name="key"
                  placeholder={t('welcome:welcome_key_compare_placeholder')}
                  onChange={this.onChange}
                  value={key}
                />
              </Segment>
              <Segment attached="bottom">
                <p>{t('tools:tools_form_permissions_auth_permission')}</p>
                <Dropdown
                  defaultValue={authorization}
                  fluid
                  onChange={this.setAuthorization}
                  options={options}
                  selection
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
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
    settings: state.settings,
    system: state.system,
    validate: state.validate
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...SettingsActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  translate(['global', 'tools', 'welcome']),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportCold);

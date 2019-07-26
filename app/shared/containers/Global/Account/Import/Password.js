// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Button, Checkbox, Divider, Grid, Header, Icon, Segment, Tab } from 'semantic-ui-react';

import GlobalButtonElevate from '../../Button/Elevate';
import GlobalFormFieldKeyPrivate from '../../../../components/Global/Form/Field/Key/Private';
import WalletPanelFormHash from '../../../../components/Wallet/Panel/Form/Hash';

import EOSAccount from '../../../../utils/EOS/Account';
import * as AccountsActions from '../../../../actions/accounts';
import * as SettingsActions from '../../../../actions/settings';
import * as WalletActions from '../../../../actions/wallet';
import * as WalletsActions from '../../../../actions/wallets';

class GlobalModalAccountImportPassword extends Component<Props> {
  render() {
    const {
      actions,
      t
    } = this.props;
    return (
      <Tab.Pane>
        <Segment basic>
          <Header size="large">
            <Icon name="lock" />
            <Header.Content>
              {t('global_account_import_private_requires_hash_header_r2')}
              <Header.Subheader>
                {t('global_account_import_private_requires_hash_subheader_r2')}
              </Header.Subheader>
            </Header.Content>
          </Header>
          <Segment basic>
            <WalletPanelFormHash
              actions={actions}
            />
          </Segment>
          <Segment color="orange">
            <Header
              color="orange"
              icon="warning"
              content="Backup your password and keys"
              subheader="Ensure you keep a copy of both your password and your keys safely offline. This password cannot be recovered, and without your password, the private keys cannot be decrypted."
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
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportPassword);

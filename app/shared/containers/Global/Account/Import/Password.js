// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Header, Icon, Modal, Segment, Tab } from 'semantic-ui-react';

import WalletPanelFormHash from '../../../../components/Wallet/Panel/Form/Hash';

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
      <Modal
        content={(
          <Segment secondary padded style={{ margin: 0 }}>
            <WalletPanelFormHash
              actions={actions}
              onClose={this.props.onClose}
            />
            <Segment color="orange">
              <Header
                color="orange"
                icon="warning"
                content={t('global_account_import_password_header_one')}
                subheader={t('global_account_import_password_subheader_one')}
              />
            </Segment>
          </Segment>
        )}
        header={(
          <Header color="black">
            <Icon name="lock" />
            <Header.Content>
              {t('global_account_import_private_requires_hash_header_r2')}
              <Header.Subheader>
                {t('global_account_import_private_requires_hash_subheader_r2')}
              </Header.Subheader>
            </Header.Content>
          </Header>
        )}
        open
        size="small"
      >

      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
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
  withTranslation('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalModalAccountImportPassword);

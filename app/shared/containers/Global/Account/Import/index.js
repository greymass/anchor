// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Header, Segment, Tab } from 'semantic-ui-react';
import compose from 'lodash/fp/compose';

import { setSetting } from '../../../../../shared/actions/settings';
import { swapBlockchain } from '../../../../../shared/actions/blockchains';

import GlobalModalAccountImportCold from '../../../../../shared/containers/Global/Account/Import/Cold';
import GlobalModalAccountImportExisting from '../../../../../shared/containers/Global/Account/Import/Existing';
import GlobalModalAccountImportHot from '../../../../../shared/containers/Global/Account/Import/Hot';
import GlobalModalAccountImportLedger from '../../../../../shared/containers/Global/Account/Import/Ledger';
import GlobalModalAccountImportWatch from '../../../../../shared/containers/Global/Account/Import/Watch';

class GlobalAccountImport extends Component<Props> {
  getPanes = () => {
    const {
      settings,
      storage,
      t
    } = this.props;
    const panes = [];

    const existingWallet = {
      menuItem: {
        key: 'existing',
        icon: 'refresh',
        content: t('global_modal_account_import_existing_wallet'),
      },
      render: () => <GlobalModalAccountImportExisting onClose={this.props.onClose} />
    };

    const ledgerWallet = {
      menuItem: {
        key: 'ledger',
        icon: 'usb',
        content: t('global_modal_account_import_ledger_wallet'),
      },
      render: () => (
        <Tab.Pane>
          <GlobalModalAccountImportLedger onClose={this.props.onClose} />
        </Tab.Pane>
      )
    };

    const hotWallet = {
      menuItem: {
        key: 'hot',
        icon: 'id card',
        content: t('global_modal_account_import_hot_wallet_r2'),
      },
      render: () => <GlobalModalAccountImportHot onClose={this.props.onClose} />
    };

    const watchWallet = {
      menuItem: {
        key: 'watch',
        icon: 'eye',
        content: t('global_modal_account_import_watch_wallet_r2'),
      },
      render: () => <GlobalModalAccountImportWatch onClose={this.props.onClose} />
    };

    const coldWallet = {
      menuItem: {
        key: 'cold',
        icon: 'snowflake',
        content: t('global_modal_account_import_cold_wallet'),
      },
      render: () => <GlobalModalAccountImportCold onClose={this.props.onClose} />
    };

    switch (settings.walletMode) {
      case 'cold': {
        panes.push(coldWallet)
        break
      }
      default: {
        if (storage.keys && storage.keys.length) {
          panes.push(existingWallet)
        }
        panes.push(hotWallet, ledgerWallet, watchWallet)
        break
      }
    }

    return panes;
  }
  render() {
    const panes = this.getPanes();
    return (
      <React.Fragment>
        <Segment attached="top" style={{ marginTop: 0 }}>
          <Header
            content="Setup an account on this blockchain."
            subheader="Choose one of the following methods to import or create an account."
          />
        </Segment>
        <Tab
          menu={{
            attached: true,
            inverted: true,
            fluid: true,
            pointing: true,
            style: {
              margin: 0
            }
          }}
          panes={panes}
          defaultActiveIndex={0}
        />
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
    storage: state.storage,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      setSetting,
      swapBlockchain,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('global'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalAccountImport);

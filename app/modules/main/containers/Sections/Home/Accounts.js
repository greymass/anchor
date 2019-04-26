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
import GlobalModalAccountImportHot from '../../../../../shared/containers/Global/Account/Import/Hot';
import GlobalModalAccountImportLedger from '../../../../../shared/containers/Global/Account/Import/Ledger';
import GlobalModalAccountImportWatch from '../../../../../shared/containers/Global/Account/Import/Watch';

class HomeAccountsContainer extends Component<Props> {
  onClose = () => {
    const {
      history,
    } = this.props;
    history.push('/');
  }
  getPanes = () => {
    const {
      settings,
      t
    } = this.props;
    const panes = [];

    const ledgerWallet = {
      menuItem: t('global_modal_account_import_ledger_wallet'),
      render: () => (
        <Tab.Pane>
          <GlobalModalAccountImportLedger onClose={this.onClose} />
        </Tab.Pane>
      )
    };
    const hotWallet = {
      menuItem: t('global_modal_account_import_hot_wallet'),
      render: () => <GlobalModalAccountImportHot onClose={this.onClose} />
    };
    const watchWallet = {
      menuItem: t('global_modal_account_import_watch_wallet'),
      render: () => <GlobalModalAccountImportWatch onClose={this.onClose} />
    };
    const coldWallet = {
      menuItem: t('global_modal_account_import_cold_wallet'),
      render: () => <GlobalModalAccountImportCold onClose={this.onClose} />
    };

    switch (settings.walletMode) {
      case 'cold': {
        panes.push(coldWallet);
        break;
      }
      default: {
        panes.push(hotWallet, watchWallet, ledgerWallet);
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
)(HomeAccountsContainer);

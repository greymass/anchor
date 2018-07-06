// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Tab } from 'semantic-ui-react';

import * as WalletActions from '../actions/wallet';
import * as WalletsActions from '../actions/wallets';

import Tools from '../components/Tools';
import ToolsKeys from '../components/Tools/Keys';
import ToolsState from '../components/Tools/State';
import ToolsWallets from '../components/Tools/Wallets';
import ToolsProxy from '../components/Tools/Proxy';

import * as WalletActions from '../actions/wallet';
import * as RegProxyActions from '../actions/system/regproxy';
import * as UnregProxyActions from '../actions/system/unregproxy';
import * as SystemStateActions from '../actions/system/systemstate';

class ToolsContainer extends Component<Props> {
  props: Props;
  render() {
    const { t } = this.props;
    const panes = [
      {
        menuItem: t('tools_menu_index'),
        render: () => <Tab.Pane><Tools {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_wallets'),
        render: () => <Tab.Pane><ToolsWallets {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_keys'),
        render: () => <Tab.Pane><ToolsKeys {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_state'),
        render: () => <Tab.Pane><ToolsState {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_proxy'),
        render: () => <Tab.Pane><ToolsProxy {...this.props} /></Tab.Pane>,
      }
    ];
    return (
      <Tab
        menu={{
          fluid: true,
          vertical: true,
          secondary: true,
          pointing: true
        }}
        panes={panes}
        defaultActiveIndex={0}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    app: state.app,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
<<<<<<< HEAD
      ...WalletsActions,
      ...WalletActions,
      ...RegProxyActions,
      ...UnregProxyActions,
      ...SystemStateActions
=======
      ...WalletActions,
      ...WalletsActions
>>>>>>> Elevate and Unlock when switching
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('tools'),
  connect(mapStateToProps, mapDispatchToProps)
)(ToolsContainer);

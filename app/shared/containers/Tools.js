// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Menu, Tab } from 'semantic-ui-react';

import Tools from '../components/Tools';
import ToolsKeys from '../components/Tools/Keys';
import ToolsStateChain from '../components/Tools/State/Chain';
import ToolsStateGlobals from '../components/Tools/State/Globals';
import ToolsStateWallet from '../components/Tools/State/Wallet';
import ToolsProxy from '../components/Tools/Proxy';
import ToolsWallets from '../components/Tools/Wallets';

import * as RegProxyActions from '../actions/system/regproxy';
import * as SystemStateActions from '../actions/system/systemstate';
import * as UnregProxyActions from '../actions/system/unregproxy';
import * as WalletActions from '../actions/wallet';
import * as WalletsActions from '../actions/wallets';

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
        menuItem: <Menu.Header className="ui">{t('tools_menu_wallet_header')}</Menu.Header>
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
        menuItem: <Menu.Header className="ui">{t('tools_menu_utilities_header')}</Menu.Header>
      },
      {
        menuItem: t('tools_menu_proxy'),
        render: () => <Tab.Pane><ToolsProxy {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: <Menu.Header className="ui">{t('tools_menu_state_header')}</Menu.Header>
      },
      {
        menuItem: t('tools_menu_state'),
        render: () => <Tab.Pane><ToolsStateWallet {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_state_globals'),
        render: () => <Tab.Pane><ToolsStateGlobals {...this.props} /></Tab.Pane>,
      },
      {
        menuItem: t('tools_menu_state_chain'),
        render: () => <Tab.Pane><ToolsStateChain {...this.props} /></Tab.Pane>,
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
    chain: state.chain,
    globals: state.globals,
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
      ...RegProxyActions,
      ...SystemStateActions,
      ...UnregProxyActions,
      ...WalletActions,
      ...WalletsActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('tools'),
  connect(mapStateToProps, mapDispatchToProps)
)(ToolsContainer);

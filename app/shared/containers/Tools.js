// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Menu, Tab } from 'semantic-ui-react';

import ContractInterface from './Contract/Interface';
import Tools from '../components/Tools';
import ToolsCustomTokens from '../components/Tools/CustomTokens';
import ToolsKeys from '../components/Tools/Keys';
import ToolsStateChain from '../components/Tools/State/Chain';
import ToolsStateGlobals from '../components/Tools/State/Globals';
import ToolsStateWallet from '../components/Tools/State/Wallet';
import ToolsProxy from '../components/Tools/Proxy';
import ToolsWallets from '../components/Tools/Wallets';
import ToolsCreateAccount from '../components/Tools/CreateAccount';

import * as AccountsActions from '../actions/accounts';
import * as ContractsActions from '../actions/contracts';
import * as CreateAccountActions from '../actions/createaccount';
import * as CustomTokensActions from '../actions/customtokens';
import * as GlobalsActions from '../actions/globals';
import * as RegProxyActions from '../actions/system/regproxy';
import * as SettingsActions from '../actions/settings';
import * as SystemStateActions from '../actions/system/systemstate';
import * as TransactionActions from '../actions/transaction';
import * as UnregProxyActions from '../actions/system/unregproxy';
import * as WalletActions from '../actions/wallet';
import * as WalletsActions from '../actions/wallets';

class ToolsContainer extends Component<Props> {
  props: Props;

  render() {
    const {
      settings,
      t
    } = this.props;

    let panes = [];

    if (settings.walletMode === 'cold') {
      panes = [
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
          menuItem: <Menu.Header className="ui">{t('tools_menu_utilities_header')}</Menu.Header>
        },
        {
          menuItem: t('tools_menu_keys'),
          render: () => <Tab.Pane><ToolsKeys {...this.props} /></Tab.Pane>,
        },
        {
          menuItem: <Menu.Header className="ui">{t('tools_menu_state_header')}</Menu.Header>
        },
        {
          menuItem: t('tools_menu_state'),
          render: () => <Tab.Pane><ToolsStateWallet {...this.props} /></Tab.Pane>,
        }
      ];
    } else {
      panes = [
        {
          menuItem: t('tools_menu_index'),
          render: () => <Tab.Pane><Tools {...this.props} /></Tab.Pane>,
        },
        {
          menuItem: <Menu.Header className="ui">{t('tools_menu_wallet_header')}</Menu.Header>
        },
        {
          menuItem: t('tools_menu_customtokens'),
          render: () => <Tab.Pane><ToolsCustomTokens {...this.props} /></Tab.Pane>,
        },
        {
          menuItem: t('tools_menu_wallets'),
          render: () => <Tab.Pane><ToolsWallets {...this.props} /></Tab.Pane>,
        },
        {
          menuItem: t('tools_menu_contracts'),
          render: () => <Tab.Pane><ContractInterface /></Tab.Pane>,
        },
        {
          menuItem: <Menu.Header className="ui">{t('tools_menu_utilities_header')}</Menu.Header>
        },
        {
          menuItem: t('tools_menu_create_account'),
          render: () => <Tab.Pane><ToolsCreateAccount {...this.props} /></Tab.Pane>,
        },
        {
          menuItem: t('tools_menu_keys'),
          render: () => <Tab.Pane><ToolsKeys {...this.props} /></Tab.Pane>,
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
    }

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
    balances: state.balances,
    blockExplorers: state.blockexplorers,
    chain: state.chain,
    contracts: state.contracts,
    customtokens: state.customtokens,
    globals: state.globals,
    keys: state.keys,
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet,
    wallets: state.wallets,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...ContractsActions,
      ...CreateAccountActions,
      ...CustomTokensActions,
      ...GlobalsActions,
      ...RegProxyActions,
      ...SettingsActions,
      ...SystemStateActions,
      ...TransactionActions,
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

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
import ToolsBlockchains from '../components/Tools/Blockchains';
import ToolsCreateAccount from '../components/Tools/CreateAccount';
import ToolsContacts from '../components/Tools/Contacts';
import ToolsCustomTokens from '../components/Tools/CustomTokens';
import ToolsKeys from '../components/Tools/Keys';
import ToolsKeysValidator from '../components/Tools/Keys/Validator';
import ToolsStateChain from '../components/Tools/State/Chain';
import ToolsStateGlobals from '../components/Tools/State/Globals';
import ToolsStateWallet from '../components/Tools/State/Wallet';
import ToolsPermissions from '../components/Tools/Permissions';
import ToolsProxy from '../components/Tools/Proxy';
import ToolsWallets from '../components/Tools/Wallets';
import ToolsReset from '../components/Tools/Reset';

import * as AccountsActions from '../actions/accounts';
import * as ContractsActions from '../actions/contracts';
import * as CreateAccountActions from '../actions/createaccount';
import * as CustomTokensActions from '../actions/customtokens';
import * as GlobalsActions from '../actions/globals';
import * as RegProxyActions from '../actions/system/regproxy';
import * as SettingsActions from '../actions/settings';
import * as SystemStateActions from '../actions/system/systemstate';
import * as TransactionActions from '../actions/transaction';
import * as UpdateAuthActions from '../actions/system/updateauth';
import * as UnregProxyActions from '../actions/system/unregproxy';
import * as WalletActions from '../actions/wallet';
import * as WalletsActions from '../actions/wallets';
import * as ValidateActions from '../actions/validate';

const paneMapping = [
  {
    element: Tools,
    modes: ['cold', 'hot', 'watch', 'skip'],
    name: 'index',
  },
  {
    header: true,
    modes: ['cold', 'hot', 'watch', 'skip'],
    name: 'wallet',
  },
  {
    element: ToolsBlockchains,
    modes: ['hot', 'watch'],
    name: 'blockchains',
  },
  {
    element: ToolsCustomTokens,
    modes: ['hot', 'watch'],
    name: 'customtokens',
  },
  {
    element: ToolsWallets,
    modes: ['cold', 'hot', 'watch'],
    name: 'wallets',
  },
  {
    element: ToolsPermissions,
    modes: ['hot', 'watch'],
    name: 'permissions',
  },
  {
    element: ContractInterface,
    modes: ['hot', 'watch', 'skip'],
    name: 'contracts',
  },
  {
    header: true,
    modes: ['cold', 'hot', 'watch', 'skip'],
    name: 'utilities',
  },
  {
    element: ToolsContacts,
    modes: ['hot', 'watch'],
    name: 'contacts',
  },
  {
    element: ToolsCreateAccount,
    modes: ['hot', 'watch'],
    name: 'create_account',
  },
  {
    element: ToolsKeys,
    modes: ['cold', 'hot', 'skip', 'watch'],
    name: 'keygenerator',
  },
  {
    element: ToolsKeysValidator,
    modes: ['cold', 'hot', 'skip', 'watch'],
    name: 'keyvalidator',
  },
  {
    element: ToolsProxy,
    modes: ['hot', 'watch'],
    name: 'proxy',
  },
  {
    header: true,
    modes: ['cold', 'hot', 'watch', 'skip'],
    name: 'state',
  },
  {
    element: ToolsStateWallet,
    modes: ['cold', 'hot', 'skip', 'watch'],
    name: 'state',
  },
  {
    element: ToolsStateGlobals,
    modes: ['hot', 'watch'],
    name: 'state_globals',
  },
  {
    element: ToolsStateChain,
    modes: ['hot', 'watch'],
    name: 'state_chain',
  },
  {
    header: true,
    modes: ['cold', 'hot', 'watch', 'skip'],
    name: 'advanced',
  },
  {
    element: ToolsReset,
    modes: ['cold', 'hot', 'skip', 'watch'],
    name: 'reset',
  },
]

class ToolsContainer extends Component<Props> {
  getPanes() {
    const { t } = this.props;
    return paneMapping
      .filter((pane) => {
        const { settings } = this.props;
        const {
          skipImport,
          walletMode
        } = settings;
        return (
          !walletMode
          || (!skipImport && pane.modes.includes(walletMode))
          || (skipImport && pane.modes.includes('skip'))
        );
      })
      .map((pane, paneIndex) => {
        if (pane.header) {
          return {
            menuItem: <Menu.Header key={paneIndex} className="ui">{t(`tools_menu_${pane.name}_header`)}</Menu.Header>
          };
        }
        return {
          menuItem: t(`tools_menu_${pane.name}`),
          render: () => (
            <Tab.Pane>
              {React.createElement(pane.element, { ...this.props })}
            </Tab.Pane>
          )
        };
      });
  }
  render() {
    const {
      settings,
      t
    } = this.props;
    const panes = this.getPanes();
    return (
      <Tab
        menu={{
          fluid: true,
          vertical: true,
          pointing: true,
          secondary: true
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
      ...UpdateAuthActions,
      ...UnregProxyActions,
      ...WalletActions,
      ...WalletsActions,
      ...ValidateActions,
    }, dispatch)
  };
}

export default compose(
  withRouter,
  translate('tools'),
  connect(mapStateToProps, mapDispatchToProps)
)(ToolsContainer);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import { Menu, Tab } from 'semantic-ui-react';

import ContractInterface from './Contract/Interface';
import RecommendationInterface from './Recommendation/Interface';

import Tools from '../components/Tools';
import ToolsBidName from '../components/Tools/BidName';
import ToolsContacts from '../components/Tools/Contacts';
import ToolsCreateAccount from '../components/Tools/CreateAccount';
import ToolsCustomTokens from '../components/Tools/CustomTokens';
import ToolsDelegations from '../components/Tools/Delegations';
import ToolsGovernanceProposals from '../components/Tools/Governance/Proposals';
import ToolsHardwareLedger from '../components/Tools/Hardware/Ledger';
import ToolsKeys from '../components/Tools/Keys';
import ToolsKeysValidator from '../components/Tools/Keys/Validator';
import ToolsPermissions from '../components/Tools/Permissions';
import ToolsProxy from '../components/Tools/Proxy';
import ToolsReset from '../components/Tools/Reset';
import ToolsStateChain from '../components/Tools/State/Chain';
import ToolsStateGlobals from '../components/Tools/State/Globals';
import ToolsStateWallet from '../components/Tools/State/Wallet';
import ToolsWallets from '../components/Tools/Wallets';

import * as AccountsActions from '../actions/accounts';
import * as BidNameActions from '../actions/system/bidname';
import * as ContractsActions from '../actions/contracts';
import * as CreateAccountActions from '../actions/createaccount';
import * as CustomTokensActions from '../actions/customtokens';
import * as GlobalsActions from '../actions/globals';
import * as HardwareLedgerActions from '../actions/hardware/ledger';
import * as NameBidsActions from '../actions/namebids';
import * as ProposalsActions from '../actions/governance/proposals';
import * as RegProxyActions from '../actions/system/regproxy';
import * as RegproxyinfoActions from '../actions/system/community/regproxyinfo';
import * as SettingsActions from '../actions/settings';
import * as StakeActions from '../actions/stake';
import * as SystemStateActions from '../actions/system/systemstate';
import * as TableActions from '../actions/table';
import * as TransactionActions from '../actions/transaction';
import * as UnregProxyActions from '../actions/system/unregproxy';
import * as UpdateAuthActions from '../actions/system/updateauth';
import * as WalletActions from '../actions/wallet';
import * as WalletsActions from '../actions/wallets';

const paneMapping = [
  {
    element: Tools,
    modes: ['cold', 'hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'index',
  },
  {
    element: ToolsWallets,
    modes: ['cold', 'hot', 'ledger', 'watch', 'skip'],
    name: 'wallets',
  },
  {
    header: true,
    modes: ['hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'governance',
  },
  {
    element: ToolsGovernanceProposals,
    modes: ['hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'governance_referendum_beta',
    requiredContract: 'proposals'
  },
  {
    header: true,
    modes: ['cold', 'hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'wallet',
  },
  {
    element: ToolsCustomTokens,
    modes: ['hot', 'ledger', 'watch', 'temp'],
    name: 'customtokens',
    requiredContract: 'customtokens'
  },
  {
    element: ToolsDelegations,
    modes: ['hot', 'ledger', 'watch', 'temp'],
    name: 'delegations'
  },
  {
    element: ToolsPermissions,
    modes: ['hot', 'ledger', 'watch', 'temp'],
    name: 'permissions',
  },
  {
    element: RecommendationInterface,
    modes: ['hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'recommendation',
  },
  {
    element: ContractInterface,
    modes: ['hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'contracts',
  },
  {
    header: true,
    modes: ['hot', 'ledger', 'watch'],
    name: 'hardware'
  },
  {
    element: ToolsHardwareLedger,
    modes: ['hot', 'ledger', 'watch'],
    name: 'hardware_ledger',
  },
  {
    header: true,
    modes: ['cold', 'hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'utilities',
  },
  // {
  //   element: ToolsBidName,
  //   modes: ['hot', 'watch'],
  //   name: 'bid_name',
  // },
  {
    element: ToolsContacts,
    modes: ['hot', 'ledger', 'watch'],
    name: 'contacts',
  },
  {
    element: ToolsCreateAccount,
    modes: ['hot', 'ledger', 'watch', 'temp'],
    name: 'create_account',
  },
  {
    element: ToolsKeys,
    modes: ['cold', 'hot', 'ledger', 'skip', 'watch', 'temp'],
    name: 'keygenerator',
  },
  {
    element: ToolsKeysValidator,
    modes: ['cold', 'hot', 'ledger', 'skip', 'watch', 'temp'],
    name: 'keyvalidator',
  },
  {
    element: ToolsProxy,
    modes: ['hot', 'ledger', 'watch', 'temp'],
    name: 'proxy',
  },
  {
    header: true,
    modes: ['cold', 'hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'state',
  },
  {
    element: ToolsStateChain,
    modes: ['hot', 'ledger', 'watch', 'temp'],
    name: 'state_chain',
  },
  {
    element: ToolsStateGlobals,
    modes: ['hot', 'ledger', 'watch', 'temp'],
    name: 'state_globals',
  },
  {
    element: ToolsStateWallet,
    modes: ['cold', 'hot', 'ledger', 'skip', 'watch', 'temp'],
    name: 'state',
  },
  {
    header: true,
    modes: ['cold', 'hot', 'ledger', 'watch', 'skip', 'temp'],
    name: 'advanced',
  },
  {
    element: ToolsReset,
    modes: ['cold', 'hot', 'ledger', 'skip', 'watch', 'temp'],
    name: 'reset',
  },
];

class ToolsContainer extends Component<Props> {
  getPanes() {
    const {
      allBlockExplorers,
      connection,
      t
    } = this.props;
    return paneMapping
      .filter((pane) => {
        const {
          settings
        } = this.props;
        const {
          skipImport,
          walletMode,
          walletTemp
        } = settings;

        const blockchainUnknownAndRestricted =
          !connection.supportedContracts && pane.requiredContract;
        const blockchainKnownAndFeatureNotSupported =
          pane.requiredContract &&
          !connection.supportedContracts.includes(pane.requiredContract);

        if (blockchainUnknownAndRestricted || blockchainKnownAndFeatureNotSupported) {
          return false;
        }
        return (
          !walletMode
          || (walletTemp && pane.modes.includes('temp'))
          || (!skipImport && !walletTemp && pane.modes.includes(walletMode))
          || (skipImport && pane.modes.includes('skip'))
        );
      })
      .map((pane) => {
        if (pane.header) {
          return {
            menuItem: (
              <Menu.Header
                active='false'
                className="ui"
                content={t(`tools_menu_${pane.name}_header`)}
                key={pane.name}
              />
            )
          };
        }
        return {
          menuItem: t(`tools_menu_${pane.name}`),
          render: () => (
            <Tab.Pane>
              {React.createElement(pane.element, {
                blockExplorers: allBlockExplorers[connection.chainKey],
                ...this.props
              })}
            </Tab.Pane>
          )
        };
      });
  }
  render() {
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
    allBlockExplorers: state.blockexplorers,
    chain: state.chain,
    connection: state.connection,
    contracts: state.contracts,
    customtokens: state.customtokens,
    globals: state.globals,
    keys: state.keys,
    ledger: state.ledger,
    proposals: state.proposals,
    settings: state.settings,
    status: HardwareLedgerActions.ledgerGetStatus(state.ledger),
    system: state.system,
    tables: state.tables,
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
      ...BidNameActions,
      ...ContractsActions,
      ...CreateAccountActions,
      ...CustomTokensActions,
      ...GlobalsActions,
      ...HardwareLedgerActions,
      ...NameBidsActions,
      ...ProposalsActions,
      ...RegProxyActions,
      ...RegproxyinfoActions,
      ...SettingsActions,
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...ToolsHardwareLedger,
      ...TransactionActions,
      ...UnregProxyActions,
      ...UpdateAuthActions,
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

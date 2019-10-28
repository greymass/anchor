// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { forEach } from 'lodash';

import { Segment } from 'semantic-ui-react';

import About from '../components/About';
import Producers from '../components/Producers';
import TabMenu from '../components/TabMenu';
import GlobalAccountSelect from './Global/Account/Select';
import Test from './Test';
import Tools from './Tools';
import Wallet from '../components/Wallet';
import Notifications from '../components/Notifications';
import ModalConstitution from '../components/Global/Modal/Constitution';

import * as AccountsActions from '../actions/accounts';
import * as AppActions from '../actions/app';
import * as BlockExplorersActions from '../actions/blockexplorers';
import * as BuyRamBytesActions from '../actions/system/buyrambytes';
import * as BuyRamActions from '../actions/system/buyram';
import * as ChainActions from '../actions/chain';
import * as ConnectionActions from '../actions/connection';
import * as ContractsActions from '../actions/contracts';
import * as CreateAccountActions from '../actions/createaccount';
import * as GlobalsActions from '../actions/globals';
import * as ProducersActions from '../actions/producers';
import * as ProposalsActions from '../actions/governance/proposals';
import * as SellRamActions from '../actions/system/sellram';
import * as SettingsActions from '../actions/settings';
import * as StakeActions from '../actions/stake';
import * as TableActions from '../actions/table';
import * as TransactionActions from '../actions/transaction';
import * as TransferActions from '../actions/transfer';
import * as ValidateActions from '../actions/validate';
import * as VoteProducerActions from '../actions/system/voteproducer';
import * as WalletActions from '../actions/wallet';
import * as SystemStateActions from '../actions/system/systemstate';
import * as BEOSWithdrawActions from '../actions/blockchains/beos/withdraw';
import * as Jurisdictions from '../actions/jurisdictions';
import * as WaxClaimActions from '../actions/blockchains/wax/claimgbmrewards';

type Props = {
  actions: {
    getAccount: () => void,
    getGlobals: () => void,
    getInfo: () => void
  },
  history: {},
  keys: {},
  settings: {},
  validate: {},
  wallet: {},
  balances: {},
  accounts: {},
  system: {},
  chain: {}
};

class BasicVoterContainer extends Component<Props> {
  props: Props;

  state = {
    activeItem: 'producer'
  };

  componentDidMount() {
    const {
      actions,
      connection,
      history,
      settings
    } = this.props;

    const {
      getBlockExplorers,
      getCurrencyStats,
      initApp
    } = actions;

    initApp();

    switch (settings.walletMode) {
      case 'cold': {
        history.push('/coldwallet');
        break;
      }
      default: {
        if (!settings.walletInit && !settings.skipImport && !settings.walletTemp) {
          history.push('/');
        } else {
          getCurrencyStats('eosio.token', connection.chainSymbol);
          getBlockExplorers();
          forEach(settings.customTokens, (token) => {
            const [chainId, contract, symbol] = token.split(':');
            if (chainId === settings.chainId) {
              getCurrencyStats(contract, symbol.toUpperCase());
            }
          });
        }
      }
    }
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 30000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      settings,
      validate
    } = this.props;
    const {
      getAccount,
      getConstants,
      getGlobals,
      getInfo,
      getTable
    } = actions;

    if (validate.NODE === 'SUCCESS') {
      if (settings.account) {
        getAccount(settings.account);
      }
      getConstants();
      getGlobals();
      getInfo();
      getTable('eosio', settings.account, 'delband');
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {
      actions,
      app,
      blockchains,
      connection,
      keys,
      settings,
      validate,
      wallet
    } = this.props;
    let {
      activeItem
    } = this.state;

    let activeTab = <Producers {...this.props} />;
    switch (activeItem) {
      case 'wallet': {
        activeTab = <Wallet {...this.props} />;
        break;
      }
      case 'about': {
        activeTab = <About {...this.props} />;
        break;
      }
      case 'test': {
        activeTab = <Test />;
        break;
      }
      case 'tools': {
        activeTab = <Tools {...this.props} />;
        break;
      }
      default: {
        break;
      }
    }

    if (['producers', 'wallet', 'tools'].includes(activeItem) && settings.walletInit && !settings.account) {
      activeTab = <GlobalAccountSelect />;
    }

    return (
      <div>
        <TabMenu
          actions={actions}
          activeItem={activeItem}
          blockchains={blockchains}
          connection={connection}
          handleItemClick={this.handleItemClick}
          locked={(!keys.key)}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
        {(settings.account)
          ? (
            <Notifications
              actions={actions}
              app={app}
              settings={settings}
              wallet={wallet}
            />
          )
          : false
        }
        <Segment
          attached="bottom"
          basic
          style={{ borderBottom: 'none' }}
        >
          {activeTab}
        </Segment>
        {(settings.chainId === 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906')
          ? (
            <ModalConstitution
              actions={actions}
              isUser={(keys.account)}
              settings={settings}
            />
          )
          : false
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    app: state.app,
    actionHistories: state.actions,
    balances: state.balances,
    blockchains: state.blockchains,
    allBlockExplorers: state.blockexplorers,
    chain: state.chain,
    connection: state.connection,
    contracts: state.contracts,
    globals: state.globals,
    jurisdictions: state.jurisdictions,
    keys: state.keys,
    ledger: state.ledger,
    producers: state.producers,
    proposals: state.proposals,
    settings: state.settings,
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
      ...AppActions,
      ...BEOSWithdrawActions,
      ...BlockExplorersActions,
      ...BuyRamActions,
      ...BuyRamBytesActions,
      ...ChainActions,
      ...ConnectionActions,
      ...ContractsActions,
      ...CreateAccountActions,
      ...GlobalsActions,
      ...ProducersActions,
      ...ProposalsActions,
      ...SellRamActions,
      ...SettingsActions,
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...TransactionActions,
      ...TransferActions,
      ...ValidateActions,
      ...VoteProducerActions,
      ...WalletActions,
      ...Jurisdictions,
      ...WaxClaimActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicVoterContainer));

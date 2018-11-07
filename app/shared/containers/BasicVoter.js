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
  system: {}
};

class BasicVoterContainer extends Component<Props> {
  props: Props;

  state = {
    activeItem: 'producers'
  };

  componentDidMount() {
    const {
      actions,
      history,
      settings
    } = this.props;

    const {
      getBlockExplorers,
      getCurrencyStats
    } = actions;

    switch (settings.walletMode) {
      case 'cold': {
        history.push('/coldwallet');
        break;
      }
      default: {
        if (!settings.walletInit && !settings.skipImport && !settings.walletTemp) {
          history.push('/');
        } else {
          getCurrencyStats();
          getBlockExplorers();
          forEach(settings.customTokens, (token) => {
            const [contract, symbol] = token.split(':');
            getCurrencyStats(contract, symbol.toUpperCase());
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
      getInfo
    } = actions;

    if (validate.NODE === 'SUCCESS') {
      if (settings.account) {
        getAccount(settings.account);
      }
      getConstants();
      getGlobals();
      getInfo();
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {
      activeItem
    } = this.state;
    const {
      actions,
      app,
      connection,
      keys,
      settings,
      validate,
      wallet
    } = this.props;

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
    return (
      <div>
        <TabMenu
          actions={actions}
          activeItem={activeItem}
          connection={connection}
          handleItemClick={this.handleItemClick}
          locked={(!keys.key)}
          settings={settings}
          validate={validate}
          wallet={wallet}
        />
        <Notifications
          actions={actions}
          app={app}
          settings={settings}
          wallet={wallet}
        />
        <Segment
          attached="bottom"
          basic
          style={{ borderBottom: 'none' }}
        >
          {activeTab}
        </Segment>
        <ModalConstitution
          actions={actions}
          isUser={(keys.account)}
          settings={settings}
        />
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
    allBlockExplorers: state.blockexplorers,
    chain: state.chain,
    connection: state.connection,
    contracts: state.contracts,
    globals: state.globals,
    keys: state.keys,
    ledger: state.ledger,
    producers: state.producers,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...AppActions,
      ...BlockExplorersActions,
      ...BuyRamActions,
      ...BuyRamBytesActions,
      ...ChainActions,
      ...ConnectionActions,
      ...ContractsActions,
      ...CreateAccountActions,
      ...GlobalsActions,
      ...ProducersActions,
      ...SellRamActions,
      ...SettingsActions,
      ...StakeActions,
      ...SystemStateActions,
      ...TableActions,
      ...TransactionActions,
      ...TransferActions,
      ...ValidateActions,
      ...VoteProducerActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicVoterContainer));

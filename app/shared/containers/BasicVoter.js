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
import Tools from './Tools';
import Transactions from '../components/Transactions';
import Wallet from '../components/Wallet';
import ModalConstitution from '../components/Global/Modal/Constitution';

import * as AccountsActions from '../actions/accounts';
import * as ChainActions from '../actions/chain';
import * as GlobalsActions from '../actions/globals';
import * as ProducersActions from '../actions/producers';
import * as SettingsActions from '../actions/settings';
import * as ValidateActions from '../actions/validate';
import * as WalletActions from '../actions/wallet';
import * as StakeActions from '../actions/stake';
import * as TransactionActions from '../actions/transaction';
import * as TransferActions from '../actions/transfer';
import * as VoteProducerActions from '../actions/system/voteproducer';

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
      keys,
      settings
    } = this.props;

    const {
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
          forEach(settings.customTokens, (token) => {
            const [contract, symbol] = token.split(':');
            getCurrencyStats(contract, symbol.toUpperCase());
          })
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
      getGlobals,
      getInfo
    } = actions;
    if (validate.NODE === 'SUCCESS') {
      if (settings.account) {
        getAccount(settings.account);
      }
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
      globals,
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
      case 'transactions': {
        activeTab = <Transactions {...this.props} />;
        break;
      }
      case 'about': {
        activeTab = <About {...this.props} />;
        break;
      }
      case 'tools': {
        activeTab = <Tools />;
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
          handleItemClick={this.handleItemClick}
          locked={(!keys.key)}
          settings={settings}
          validate={validate}
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
    balances: state.balances,
    chain: state.chain,
    globals: state.globals,
    keys: state.keys,
    producers: state.producers,
    settings: state.settings,
    system: state.system,
    transaction: state.transaction,
    transactions: state.transactions,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...AccountsActions,
      ...ChainActions,
      ...GlobalsActions,
      ...ProducersActions,
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions,
      ...StakeActions,
      ...TransactionActions,
      ...TransferActions,
      ...VoteProducerActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicVoterContainer));

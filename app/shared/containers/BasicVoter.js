// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Segment } from 'semantic-ui-react';

import About from '../components/About';
import Producers from '../components/Producers';
import TabMenu from '../components/TabMenu';
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
import * as TransferActions from '../actions/transfer';
import * as VoteProducerActions from '../actions/system/voteproducer';

type Props = {
  actions: {
    getAccount: () => void,
    getGlobals: () => void,
    getInfo: () => void
  },
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
      history,
      validate
    } = this.props;
    if (validate.NODE !== 'SUCCESS') {
      history.push('/');
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
      getCurrencyStats,
      getGlobals,
      getInfo,
      getAccount
    } = actions;
    if (validate.NODE === 'SUCCESS') {
      getCurrencyStats();
      getGlobals();
      getInfo();
      if (validate.ACCOUNT === 'SUCCESS') {
        getAccount(settings.account);
      }
    }
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const {
      activeItem
    } = this.state;
    const {
      actions,
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
      ...TransferActions,
      ...VoteProducerActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicVoterContainer));

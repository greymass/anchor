// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Menu, Tab } from 'semantic-ui-react';

import Producers from '../components/Producers';
import Wallet from '../components/Wallet';
import WalletLockState from '../components/Wallet/LockState';
import Stake from '../components/Stake';

import * as AccountsActions from '../actions/accounts';
import * as ChainActions from '../actions/chain';
import * as GlobalsActions from '../actions/globals';
import * as ProducersActions from '../actions/producers';
import * as SettingsActions from '../actions/settings';
import * as ValidateActions from '../actions/validate';
import * as WalletActions from '../actions/wallet';
import * as StakeActions from '../actions/stake';

import logo from '../../renderer/assets/images/greymass.png';

type Props = {
  actions: {
    getAccount: () => void,
    getGlobals: () => void,
    getInfo: () => void
  },
  keys: {},
  settings: {},
  validate: {},
  wallet: {}
};

class BasicVoterContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    // Validate settings on app start
    const {
      actions,
      settings,
      validate
    } = this.props;
    // Always validate the node on startup
    actions.validateNode(settings.node);
    if (!validate.ACCOUNT || validate.ACCOUNT !== 'SUCCESS') {
      actions.validateAccount(settings.account);
    }
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 15000);
  }


  componentWillReceiveProps(nextProps) {
    const { validate } = this.props;
    const nextValidate = nextProps.validate;
    if (
      validate.NODE === 'PENDING'
      && nextValidate.NODE === 'SUCCESS'
    ) {
      this.tick();
    }
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
      getGlobals,
      getInfo,
      getAccount
    } = actions;
    if (validate.NODE === 'SUCCESS') {
      getGlobals();
      getInfo();
      if (validate.ACCOUNT === 'SUCCESS') {
        getAccount(settings.account);
      }
    }
  }

  render() {
    const {
      keys,
      wallet
    } = this.props;
    const panes = [
      {
        menuItem: { key: 'producers', icon: 'check square', content: 'Producer Voting' },
        pane: (
          <Tab.Pane key="producers" style={{ marginTop: '3em' }}>
            <Producers {...this.props} />
          </Tab.Pane>
        )
      },
      {
        menuItem: { key: 'stake', icon: 'microchip', content: 'Stake' },
        pane: (
          <Tab.Pane key="stake" style={{ marginTop: '3em' }}>
            <Stake {...this.props} />
          </Tab.Pane>
        )
      },
      {
        menuItem: { key: 'wallet', icon: 'protect', content: 'Wallet' },
        pane: (
          <Tab.Pane key="wallet" style={{ marginTop: '3em' }}>
            <Wallet {...this.props} />
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Menu key="right" position="right">
            <WalletLockState
              keys={keys}
              wallet={wallet}
            />
            <Menu.Item key="about" position="right">
              <img alt="Greymass" src={logo} />
            </Menu.Item>
          </Menu.Menu>
        ),
        pane: (
          <Tab.Pane key="about" style={{ marginTop: '3em' }}>
            about area
          </Tab.Pane>
        )
      }
    ];
    return (
      <Tab
        menu={{
          fixed: 'top',
          inverted: true,
          size: 'large'
        }}
        renderActiveOnly={false}
        panes={panes}
      />
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
      ...StakeActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicVoterContainer));

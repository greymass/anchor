// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Menu, Tab } from 'semantic-ui-react';

import Producers from '../components/Producers';
import Wallet from '../components/Wallet';

import * as AccountsActions from '../actions/accounts';
import * as GlobalsActions from '../actions/globals';
import * as ProducersActions from '../actions/producers';
import * as SettingsActions from '../actions/settings';
import * as ValidateActions from '../actions/validate';
import * as WalletActions from '../actions/wallet';


type Props = {
  actions: {
    getAccount: () => void,
    getGlobals: () => void
  },
  keys: {},
  settings: {},
  validate: {}
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
    if (!validate.ACCOUNT || validate.ACCOUNT !== 'SUCCESS') {
      actions.validateAccount(settings, settings.account);
    }
    if (!validate.NODE || validate.NODE !== 'SUCCESS') {
      actions.validateNode(settings, settings.node);
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
    const { validate } = this.props;
    if (validate.NODE === 'SUCCESS') {
      this.getGlobals();
      if (validate.ACCOUNT === 'SUCCESS') {
        this.getAccount();
      }
    }
  }

  getGlobals = () => {
    const { getGlobals } = this.props.actions;
    const { settings } = this.props;
    getGlobals(settings);
  }

  getAccount = () => {
    const { getAccount } = this.props.actions;
    const { settings } = this.props;
    getAccount(settings);
  }

  render() {
    const { keys } = this.props;
    const walletLocked = (!keys.key);

    const panes = [
      {
        menuItem: 'Producer Voting',
        pane: (
          <Tab.Pane key="producers" style={{ marginTop: '3em' }}>
            <Producers {...this.props} />
          </Tab.Pane>
        )
      },
      {
        menuItem: 'Wallet',
        pane: (
          <Tab.Pane key="wallet" style={{ marginTop: '3em' }}>
            <Wallet {...this.props} />
          </Tab.Pane>
        )
      },
      {
        menuItem: (
          <Menu.Item key="status" position="right" disabled>
            Wallet {(walletLocked) ? 'locked' : 'unlocked'}
          </Menu.Item>
        )
      },
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
      ...GlobalsActions,
      ...ProducersActions,
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BasicVoterContainer));

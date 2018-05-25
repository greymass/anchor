// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Tab } from 'semantic-ui-react';

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
    getGlobals: () => void
  },
  settings: {},
  validate: {}
};

class BasicVoterContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 60000);
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
    const { settings } = this.props;
    if (settings && settings.node) {
      this.getGlobals();
    }
  }

  getGlobals = () => {
    const { getGlobals } = this.props.actions;
    const { settings } = this.props;
    getGlobals(settings);
  }

  render() {
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
    globals: state.globals,
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

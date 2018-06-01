// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Welcome from '../components/Welcome';

import * as AccountsActions from '../actions/accounts';
import * as ChainActions from '../actions/chain';
import * as GlobalsActions from '../actions/globals';
import * as ProducersActions from '../actions/producers';
import * as SettingsActions from '../actions/settings';
import * as ValidateActions from '../actions/validate';
import * as WalletActions from '../actions/wallet';
import * as StakeActions from '../actions/stake';
import * as VoteProducerActions from '../actions/system/voteproducer';

type Props = {
  keys: {},
  history: {},
  settings: {},
  validate: {},
  wallet: {}
};

class WelcomeContainer extends Component<Props> {
  props: Props;
  componentDidMount() {
    const {
      history,
      validate
    } = this.props;
    if (validate.NODE === 'SUCCESS') {
      history.push('/voter');
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      history,
      validate
    } = nextProps;
    if (validate && validate.NODE === 'SUCCESS') {
      history.push('/voter');
    }
  }

  render() {
    const {
      actions,
      keys,
      settings,
      validate,
      wallet
    } = this.props;
    return (
      <Welcome
        actions={actions}
        keys={keys}
        settings={settings}
        validate={validate}
        wallet={wallet}
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
      ...VoteProducerActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer));

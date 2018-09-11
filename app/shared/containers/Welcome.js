// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Welcome from '../components/Welcome';

import * as SettingsActions from '../actions/settings';
import * as ValidateActions from '../actions/validate';
import * as WalletActions from '../actions/wallet';

type Props = {
  actions: {},
  connection: {},
  history: {},
  keys: {},
  settings: {},
  validate: {}
};

class WelcomeContainer extends Component<Props> {
  props: Props;

  componentDidMount() {
    const {
      actions,
      history,
      settings,
      validate,
      wallet
    } = this.props;
    const {
      setWalletMode
    } = actions;
    setWalletMode(settings.walletMode);

    switch (settings.walletMode) {
      case 'cold': {
        if (settings.walletInit && wallet.data) {
          history.push('/coldwallet');
        }
        break;
      }
      default: {
        if (validate.NODE !== 'SUCCESS' && settings.node) {
          const { validateNode } = actions;
          validateNode(settings.node);
        }
        break;
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    const {
      actions,
      history,
      settings,
      validate,
      wallet
    } = this.props;
    if (validate.NODE !== 'SUCCESS' && nextProps.validate.NODE === 'SUCCESS') {
      if (settings.walletInit) {
        history.push('/voter');
      } else if (!!wallet.account && !!wallet.data && wallet.version === 1) {
        // If a wallet account + data exists and the wallet is V1, update init flag and proceed.
        actions.setSetting('walletInit', true);
        history.push('/voter');
      }
    }
  }

  render() {
    const {
      actions,
      connection,
      history,
      keys,
      settings,
      validate
    } = this.props;
    
    return (
      <Welcome
        actions={actions}
        connection={connection}
        history={history}
        keys={keys}
        settings={settings}
        validate={validate}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    connection: state.connection,
    keys: state.keys,
    settings: state.settings,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
      ...ValidateActions,
      ...WalletActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer));

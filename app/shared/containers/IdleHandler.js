// @flow
import IdleTimer from 'react-idle-timer';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { history } from '../store/renderer/configureStore';
import UpdaterContainer from './Updater';

import WalletActions from '../actions/wallet';

class IdleHandler extends Component<Props> {
  constructor(props) {
    super(props);

    this.idleTimer = null;
  }

  onIdle = () => {
    const {
      actions,
      keys
    } = this.props;

    const {
      lockWallet
    } = actions;

    if (keys.key.length > 0) {
      lockWallet();
    }
  }

  render() {
    const {
      settings
    } = this.props;

    const Routes = this.props.routes;

    return (
      <IdleTimer
        ref={ref => { this.idleTimer = ref; }}
        element={document}
        onIdle={this.onIdle}
        timeout={settings.idleTimeout}
      >
        <UpdaterContainer>
          <ConnectedRouter history={history}>
            <Routes />
          </ConnectedRouter>
        </UpdaterContainer>
      </IdleTimer>
    );
  }
}

function mapStateToProps(state) {
  return {
    keys: state.keys,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...WalletActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IdleHandler);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IdleTimer from 'react-idle-timer';

import WalletActions from '../../actions/wallet';

class IdleContainer extends Component<Props> {
  constructor(props) {
    super(props);

    this.idleTimer = null;
  }

  onIdle = () => {
    const {
      actions,
      settings
    } = this.props;

    const {
      lockWallet
    } = actions;

    if (['cold', 'hot'].includes(settings.walletMode)) {
      lockWallet();
    }
  }

  render() {
    const {
      settings
    } = this.props;

    return (
      <IdleTimer
        ref={ref => { this.idleTimer = ref; }}
        element={document}
        onIdle={this.onIdle}
        timeout={settings.idleTimeout || 999999999}
      >
        {this.props.children}
      </IdleTimer>
    );
  }
}

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(IdleContainer);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ToolsPing from '../../../../../shared/components/Tools/Ping';

import * as PingActions from '../../../../../shared/actions/ping';
import * as ProducersActions from '../../../../../shared/actions/producers';
import * as SettingsActions from '../../../../../shared/actions/settings';

class ToolsApiPing extends Component<Props> {
  render = () => (
    <ToolsPing
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  return {
    app: state.app,
    chain: state.chain,
    connection: state.connection,
    ping: state.ping,
    producers: state.producers,
    settings: state.settings,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...PingActions,
      ...ProducersActions,
      ...SettingsActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsApiPing));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import compose from 'lodash/fp/compose';

import ToolsPing from '../../../components/Tools/Ping';

import * as PingActions from '../../../actions/ping';
import * as ProducersActions from '../../../actions/producers';
import * as SettingsActions from '../../../actions/settings';

class GlobalUtilsPingContainer extends Component<Props> {
  render() {
    return (
      <ToolsPing {...this.props} />
    );
  }
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

export default compose(
  withRouter,
  translate('utils'),
  connect(mapStateToProps, mapDispatchToProps)
)(GlobalUtilsPingContainer);

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import About from '../../../../shared/components/About';
import * as SettingsActions from '../../../../shared/actions/settings';

class VersionContainer extends Component<Props> {
  render() {
    return (
      <About {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions,
    allBlockExplorers: state.blockexplorers,
    connection: state.connection,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...SettingsActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VersionContainer));

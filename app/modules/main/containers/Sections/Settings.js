// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Tools from '../../../../shared/components/Tools';
import * as SettingsActions from '../../../../shared/actions/settings';

class SettingsContainer extends Component<Props> {
  render() {
    return (
      <Tools {...this.props} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SettingsContainer));

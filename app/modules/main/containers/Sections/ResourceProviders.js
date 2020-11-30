// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import ResourceProvidersOverview from './ResourceProviders/Overview';

class ResourceProvidersContainer extends Component<Props> {
  render() {
    return (
      <ResourceProvidersOverview />
    );
  }
}

function mapStateToProps(state) {
  return {
    actions: state.actions,
    settings: state.settings,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceProvidersContainer));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

class ResourceProvidersOverview extends Component<Props> {
  render = () => (
    <Segment>
      Resource Provider Overview
    </Segment>
  )
}

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceProvidersOverview));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Placeholder, Segment } from 'semantic-ui-react';
import { times } from 'lodash';

import Tools from '../../../../shared/containers/Tools';

class ToolsContainer extends Component<Props> {
  render() {
    return (
      <Tools />
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsContainer));

// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Placeholder, Segment } from 'semantic-ui-react';
import { times } from 'lodash';

import Tools from '../../../../shared/containers/Tools';

class TestsContainer extends Component<Props> {
  render() {
    return (
      <Segment>
        test
      </Segment>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestsContainer));

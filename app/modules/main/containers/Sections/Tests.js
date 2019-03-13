// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Placeholder, Segment } from 'semantic-ui-react';
import { times } from 'lodash';

import Tools from '../../../../shared/containers/Tools';

import URIActions from '../../../handler/actions/uri';
const { ipcRenderer } = require('electron')

class TestsContainer extends Component<Props> {
  testURI = () => {
    ipcRenderer.send('openUri', 'eosio://gWNgZGRkWLKvhPGVQSgDCCwwugsUgQAYLQRjAIGCm_OuXYwMIDUA');
  }
  render() {
    return (
      <Segment>
        <Button
          content="URI Test"
          onClick={this.testURI}
        />
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
      ...URIActions,
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TestsContainer));

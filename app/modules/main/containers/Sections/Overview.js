// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Placeholder, Segment } from 'semantic-ui-react';
import { times } from 'lodash';

class OverviewContainer extends Component<Props> {
  render() {
    const {
      app
    } = this.props;
    console.log(this.props)
    return (
      <Segment>
        overview
        <Segment vertical>
          {times(10, i => (
            <Placeholder fluid key={i}>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          ))}
        </Segment>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    app: state.app,
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({

    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OverviewContainer));

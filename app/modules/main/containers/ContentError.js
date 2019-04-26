// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Container, Form, Header, Segment } from 'semantic-ui-react';
import NavigationActions from '../actions/navigation';

const { getCurrentWindow } = require('electron').remote;

class ContentErrorContainer extends Component<Props> {
  reset = () => {
    getCurrentWindow().reload();
  }
  render = () => {
    return (
      <Container fluid>
        <Segment size="large">
          <Header
            content="Anchor has encountered an error"
            subheader=""
          />
          <p>
            If this involved issuing a transaction on a blockchain, that action may have still
            processed successfully - so before trying again, please check your account history to
            verify whether or not the last operation succeeded.
          </p>
          <p>
            To report this bug to the Anchor team, please use the Help > Report Bug feature and
            let us know the contents of the error message below.
          </p>
          <Form>
            <Form.Field>
              <label>Error Message</label>
              <Form.TextArea
                rows={12}
                style={{ whiteSpace: 'nowrap' }}
                value={this.props.error.stack}
              />
            </Form.Field>
            <Form.Button
              content="Reload Anchor"
              icon="refresh"
              onClick={this.reset}
              primary
            />
          </Form>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    settings: state.settings,
    validate: state.validate,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...NavigationActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentErrorContainer);

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Button, Form, Header, Segment } from 'semantic-ui-react';

const { ipcRenderer } = require('electron');

class ToolsDisplay extends Component<Props> {
  reset = () => {
    ipcRenderer.send('anchor-resize');
  }
  render = () => {
    const { setupData } = this.props.settings
    return (
      <Segment>
        <Header>
          Anchor Display Properties
        </Header>
        <Button
          content="Reset Window Size"
          onClick={this.reset}
        />
        <Header attached="top" block content="Window Settings" size="small" />
        <Segment attached="bottom">
          <Form >
            <Form.Group>
              <Form.Input label="Width" name="width" value={setupData.width} />
              <Form.Input label="Height" name="height" value={setupData.height} />
              <Form.Input label="X" name="x" value={setupData.x} />
              <Form.Input label="Y" name="y" value={setupData.y} />
            </Form.Group>
          </Form>
        </Segment>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

export default withRouter(connect(mapStateToProps)(ToolsDisplay));

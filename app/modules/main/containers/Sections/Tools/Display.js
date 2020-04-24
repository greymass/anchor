// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';
import compose from 'lodash/fp/compose';

const { ipcRenderer } = require('electron');

class ToolsDisplay extends Component<Props> {
  reset = () => {
    ipcRenderer.send('anchor-resize');
  }
  render = () => {
    const { settings, t } = this.props;
    const { setupData } = settings;

    return (
      <Segment>
        <Header>
          {t('main_components_tools_display_header_one')}
        </Header>
        <Button
          content={t('main_components_tools_display_button')}
          onClick={this.reset}
        />
        <Header attached="top" block content={t('main_components_tools_display_header_two')} size="small" />
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

export default compose(
  withTranslation('main'),
  withRouter,
  connect(mapStateToProps)
)(ToolsDisplay);

// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import ReactJson from 'react-json-view';
import { Dimmer, Loader, Grid, Header, Icon, Label, Message, Placeholder, Segment } from 'semantic-ui-react';

class PromptStageLedger extends Component<Props> {
  render() {
    const {
      prompt,
    } = this.props;
    return (
      <Segment basic>
        <Dimmer
          active
          inverted
        >
          <Loader
            indeterminate
            size="big"
          >
            <Header>
              Complete Transaction on Device
            </Header>
          </Loader>
        </Dimmer>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    prompt: state.prompt,
  };
}

export default compose(
  translate('global'),
  connect(mapStateToProps)
)(PromptStageLedger);

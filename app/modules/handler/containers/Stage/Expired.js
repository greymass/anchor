// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';

class PromptStageExpired extends Component<Props> {
  render() {
    const {
      uri,
    } = this.props;
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment basic>
            <Header size="large">
              <Icon name="warning sign" />
              <Header.Content>
                This signing request has expired!
                <Header.Subheader>
                  Each request from the moment initiated has a limited lifetime to execute.
                </Header.Subheader>
              </Header.Content>
            </Header>
          </Segment>
        </Grid.Column>
      </Grid>
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
)(PromptStageExpired);

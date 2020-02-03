// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Icon, Segment } from 'semantic-ui-react';

class PromptStageError extends Component<Props> {
  render() {
    const {
      system
    } = this.props;
    let error;
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment basic textAlign="center">
            <Header icon size="large">
              <Icon name="warning sign" />
              <Header.Content style={{ marginTop: '1em' }}>
                Error processing request
                <Header.Subheader>
                  Please try again. If the problem persists, please contact the dApp developer or Greymass for support.
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
)(PromptStageError);

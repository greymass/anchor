// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';

class PromptStageError extends Component<Props> {
  render() {
    const {
      error
    } = this.props;
    return (
      <Grid centered>
        <Grid.Column width={14}>
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
            {(error)
              ? (
                <Message
                  header="Details"
                  content={error}
                  error
                />
              )
              : false
            }
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

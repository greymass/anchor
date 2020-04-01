// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';
import { Form, Grid, Header, Icon, Segment } from 'semantic-ui-react';

class PromptStageForbidden extends Component<Props> {
  render() {
    const {
      error,
      prompt,
      t,
    } = this.props;
    const { uri } = prompt;
    const uriParts = uri.split(':');
    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment color="red" size="large">
            <Header color="red" size="large">
              <Icon name="warning sign" />
              <Header.Content>
                This request has a forbidden action.
                <Header.Subheader>
                  Anchor prevents certain types of actions from being performed to help
                  protect your account(s).
                </Header.Subheader>
              </Header.Content>
            </Header>
            <Segment padded secondary>
              <strong>Error Code: {error.message}</strong>
            </Segment>
            <p>
              If you would like to learn more about why this signing request has potentially
              dangerous effects, share the following signing request URL with the experts you trust.
            </p>
            <Segment basic>
              <Form>
                <Form.TextArea>
                  {`https://eosio.to/${uriParts[1]}`}
                </Form.TextArea>
              </Form>
            </Segment>
            <p>
              If you are absolutely sure you would like to perform this action, you can allow
              dangerous actions from within your wallet settings and try again.
            </p>
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
)(PromptStageForbidden);

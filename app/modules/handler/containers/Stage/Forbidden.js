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
          <Segment basic size="large">
            <Header size="large">
              <Icon name="warning sign" />
              <Header.Content>
                This Signing Request has a forbidden action.
                <Header.Subheader>
                  Anchor prevents certain types of actions from being performed to help protect your account(s).
                </Header.Subheader>
              </Header.Content>
            </Header>
            <p>{t(error.message)}</p>
            <p>If you'd like to learn more about why this signing request has potentially dangerous effects, share the following URL with those you trust for their opinion.</p>
            <Form>
              <Form.TextArea>
                {`https://eosio.to/${uriParts[1]}`}
              </Form.TextArea>
            </Form>
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

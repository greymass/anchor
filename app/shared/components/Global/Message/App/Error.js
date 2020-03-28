// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Message, Header, Segment } from 'semantic-ui-react';

class FormMessageError extends Component<Props> {
  render() {
    const {
      error,
    } = this.props;

    return (
      <Segment>
        <Header>An error occured while loading the app:</Header>
        {typeof error === 'object' ? (
          <Message negative>
            <Header>{error.message}</Header>
            <p>{error.stack}</p>
          </Message>
        ) : (
          <Message negative>
            <Header>
              {error}
            </Header>
          </Message>
        )}
      </Segment>
    );
  }
}

export default translate('global')(FormMessageError);

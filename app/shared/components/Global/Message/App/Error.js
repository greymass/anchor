// @flow
import React, { Component } from 'react';

import { withTranslation } from 'react-i18next';

import { Message, Header, Segment } from 'semantic-ui-react';

class FormMessageError extends Component<Props> {
  render() {
    const {
      error,
      t,
    } = this.props;

    return (
      <Segment>
        <Header>{t('global_message_error_header')}</Header>
        {typeof error === 'object'
          ? (
            <Message negative>
              <Header>{error.message}</Header>
              <p>{error.stack}</p>
            </Message>
          )
          : (
            <Message negative>
              <Header>
                {error}
              </Header>
            </Message>
          )
        }
      </Segment>
    );
  }
}

export default withTranslation('global')(FormMessageError);

// @flow
import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Header, Icon, Message } from 'semantic-ui-react';

class ErrorMessage extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;
    return (
      <Message
        content={error.message}
        header={t('error')}
        icon="warning sign"
        negative
      />
    );
  }
}

export default withTranslation('handler')(ErrorMessage);

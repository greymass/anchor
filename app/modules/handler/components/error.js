// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Header, Icon, Message } from 'semantic-ui-react';

class ErrorMessage extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;
    console.log(this.props)
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

export default translate('global')(ErrorMessage);

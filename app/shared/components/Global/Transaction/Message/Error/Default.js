import React, { Component } from 'react';
import { translate } from 'react-i18next';

class GlobalTransactionMessageErrorDefault extends Component<Props> {
  render() {
    const {
      error
    } = this.props;

    let errorMessage = error.error.details[0] && error.error.details[0].message;

    if (errorMessage) {
      errorMessage = errorMessage.split('assertion failure with message:')[0];
    }

    return (
      <p key={error}>{errorMessage || error.message}</p>
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorDefault);

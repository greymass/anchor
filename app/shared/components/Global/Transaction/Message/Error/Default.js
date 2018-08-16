import React, { Component } from 'react';
import { translate } from 'react-i18next';

class GlobalTransactionMessageErrorDefault extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;

    let errorMessage = error.error && error.error.details[0] && error.error.details[0].message;

    if (errorMessage) {
      const errorMessageArray = errorMessage.split('assertion failure with message:');
      errorMessage = errorMessageArray[1] && errorMessageArray[1].trim().split(' ').join('_');
    }

    return (
      <p key={error}>{t(errorMessage || error.message)}</p>
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorDefault);

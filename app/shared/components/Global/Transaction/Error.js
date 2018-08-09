// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionErrorAuthorization from './Error/Authorization';
import GlobalTransactionErrorDefault from './Error/Default';

const transactionErrorsMapping = {
  authorization: GlobalTransactionErrorAuthorization
};

class GlobalTransactionError extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      error
    } = this.props;

    this.state = {
      ComponentType: transactionErrorsMapping[error] || GlobalTransactionErrorDefault
    };
  }

  render() {
    const {
      error,
      onClose,
      style
    } = this.props;

    return (
      <ComponentType
        error={error}
        onClose={onClose}
        style={style}
      />
    );
  }
}

export default GlobalTransactionError;

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalTransactionErrorAuthorization from './Error/Authorization';
import GlobalTransactionErrorDefault from './Error/Default';

const transactionErrorsMapping = {
  unsatisfied_authorization: GlobalTransactionErrorAuthorization
};

class GlobalTransactionMessageError extends Component<Props> {
  constructor(props) {
    super(props);
    const {
      error
    } = this.props;

    this.state = {
      ComponentType: transactionErrorsMapping[error.error && error.error.name] ||
        GlobalTransactionErrorDefault
    };
  }

  render() {
    const {
      error,
      onClose,
      style
    } = this.props;

    const {
      ComponentType
    } = this.state;

    debugger

    return (
      <ComponentType
        error={error}
        onClose={onClose}
        style={style}
      />
    );
  }
}

export default GlobalTransactionMessageError;

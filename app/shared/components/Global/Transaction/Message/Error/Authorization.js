import React, { Component } from 'react';
import { translate } from 'react-i18next';

class GlobalTransactionMessageErrorAuthorization extends Component<Props> {
  render() {
    const {
      error,
      onClose,
      style
    } = this.props;

    const {
      ComponentType
    } = this.state;

    return (
      <ComponentType
        error={error}
        onClose={onClose}
        style={style}
      />
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorAuthorization);

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Message } from 'semantic-ui-react';

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

    const errorName = error.error && error.error.name;

    this.state = {
      ComponentType: transactionErrorsMapping[errorName] || GlobalTransactionErrorDefault
    };
  }

  render() {
    const {
      error,
      onClose,
      style,
      t
    } = this.props;

    const {
      ComponentType
    } = this.state;

    return (
      <div style={style}>
        <Message negative>
          <Header>{t('error')}</Header>
          <ComponentType
            error={error}
            onClose={onClose}
            style={style}
          />
        </Message>
        {(onClose) ? (
          <Button
            color="red"
            content={t('close')}
            fluid
            onClick={onClose}
          />) : ''}
      </div>
    );
  }
}

export default translate('global')(GlobalTransactionMessageError);

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Message } from 'semantic-ui-react';

class GlobalTransactionMessageError extends Component<Props> {
  render() {
    const {
      error,
      errors,
      onClose,
      t
    } = this.props;

    const errorObjects = (errors || []);

    errorObjects.push(error);

    const errorMessages = errorObjects.map((err) => {
      if (err && err.code) {
        const details = (err.error && err.error.details.length > 0)
          ? err.error.details[0].message
          : false;
        return details || err.error.name || err.name || err.message;
      }

      return err;
    });

    return (error || errors)
      ? [(
        <Message negative>
          { errorMessages.map((err) => <p key={err}>{t(`error_${err}`)}</p>) }
        </Message>
      ), (
        <Button
          color="red"
          content={t('close')}
          fluid
          onClick={onClose}
        />
      )]
      : '';
  }
}

export default translate('global')(GlobalTransactionMessageError);

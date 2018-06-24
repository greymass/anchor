// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Message, Header } from 'semantic-ui-react';

class FormMessageError extends Component<Props> {
  render() {
    const {
      error,
      errors,
      onClose,
      t
    } = this.props;

    const errorMessages = (errors || []);

    errorMessages.push(error);

    return (error || errors)
      ? (
        <div>
          <Message negative>
            <Header>{t('error')}</Header>
            { errorMessages.map((err) => <p key={err}>{t(`error_${err}`)}</p>) }
          </Message>

          {(onClose) ? (
            <Button
              color="red"
              content={t('close')}
              fluid
              onClick={onClose}
            />) : ''}
        </div>
      ) : '';
  }
}

export default translate('global')(FormMessageError);

import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Header, Message } from 'semantic-ui-react';

class GlobalTransactionMessageErrorDefault extends Component<Props> {
  render() {
    const {
      error,
      onClose,
      style,
      t
    } = this.props;

    return (
      <div style={style}>
        <Message negative>
          <Header>{t('error')}</Header>
          <p key={error}>{t(`error_${error}`)}</p>
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

export default translate('global')(GlobalTransactionMessageErrorDefault);

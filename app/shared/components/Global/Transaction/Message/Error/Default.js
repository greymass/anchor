import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Header, Message } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

export class GlobalTransactionMessageErrorDefault extends Component<Props> {
  render() {
    const {
      error,
      t
    } = this.props;

    let errorMessage = error.error && error.error.details && error.error.details[0] && error.error.details[0].message;

    if (errorMessage) {
      const errorMessageArray = errorMessage.split('assertion failure with message:');
      errorMessage = errorMessageArray[1] &&
        errorMessageArray[1]
          .trim()
          .split(' ')
          .slice(0, 8)
          .join('_');
      // The above line will basically take the first 8 words
      // of message and turn it into a locale key.
      errorMessage = errorMessage && errorMessage.replace(/\(|\)|%/g, '');
      errorMessage = errorMessage || errorMessageArray[0];
    }
    return (
      <Message negative>
        <Header>{t('error')}</Header>
        <p key={error}>
          {(errorMessage)
            ? t(errorMessage)
            : `${error.message} (${error.error ? error.error : ''})`
          }
        </p>
        {(typeof error === 'object' && !(error instanceof Error)) ? (
          <ReactJson
            collapsed={1}
            collapseStringsAfterLength={60}
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={error}
            style={{ padding: '1em' }}
          />
        ) : ''}
      </Message>
    );
  }
}

export default withTranslation('global')(GlobalTransactionMessageErrorDefault);

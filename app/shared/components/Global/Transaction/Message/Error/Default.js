import React, { Component } from 'react';
import { translate } from 'react-i18next';
import ReactJson from 'react-json-view';

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
      errorMessage = errorMessage || errorMessageArray[0];
    }

    return (
      <div>
        <p key={error}>{t(errorMessage || error.message)}</p>

        {(typeof error === 'object' && !(error instanceof Error)) ? (
          <ReactJson
            collapsed={2}
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={error}
            style={{ padding: '1em' }}
          />
        ) : ''}
      </div>
    );
  }
}

export default translate('global')(GlobalTransactionMessageErrorDefault);

// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Button, Message, Header } from 'semantic-ui-react';
import ReactJson from 'react-json-view';

class FormMessageError extends Component<Props> {
  render() {
    const {
      error,
    } = this.props;

    return (
      <Message negative>
        <Header>An error occured while loading the app:</Header>
        {typeof error === 'object' ? (
          <ReactJson
            displayDataTypes={false}
            displayObjectSize={false}
            iconStyle="square"
            name={null}
            src={error}
            style={{ padding: '1em' }}
            theme="harmonic"
          />
        ) : (
          <p>
            {error}
          </p>
        )}
      </Message>
    );
  }
}

export default translate('global')(FormMessageError);

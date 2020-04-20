// @flow
import React, { Component } from 'react';

const { withTranslation, translate } = require('react-i18next')
const i18n = require('react-i18next')

// import i18n from 'react-i18next';
// console.log({withTranslation});
// console.log({translate})
// console.log({ json: JSON.stringify(i18n)})
// console.log({version: require('react-i18next').version})
console.dir(Object.keys(require('react-i18next')));
console.log(require.resolve('react-i18next'));

import { Message, Header, Segment } from 'semantic-ui-react';

class FormMessageError extends Component<Props> {
  render() {
    const {
      error,
    } = this.props

    return (
      <Segment>
        <Header>An error occured while loading the app:</Header>
        {typeof error === 'object' ? (
          <Message negative>
            <Header>{error.message}</Header>
            <p>{error.stack}</p>
          </Message>
        ) : (
          <Message negative>
            <Header>
              {error}
            </Header>
          </Message>
        )}
      </Segment>
    );
  }
}

export default FormMessageError;
